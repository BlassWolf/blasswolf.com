import { GraphQLContext, ListParams } from "./types";
import { v4 as uuidv4 } from "uuid";

export default class DataSource<
  T extends {
    id: string;
    [key: string]: any;
    createdAt: number;
    updatedAt?: number;
  }
> {
  static collection: string = "items";
  static prefix: string = "itm";

  constructor(public context: GraphQLContext) {
    this.context = context;
  }

  protected get static() {
    const { collection, prefix } = this.constructor as typeof DataSource;
    return { collection, prefix };
  }

  protected key(id: string) {
    return `${this.static.collection}::${id}`;
  }

  get(id: string) {
    return this.context.redis.get(this.key(id)).then((value) => {
      if (!value) return null;
      return JSON.parse(value) as T;
    });
  }

  set(id: string, item: T): Promise<T> {
    const value = JSON.stringify({ ...item, id, updatedAt: Date.now() });
    return new Promise((resolve, reject) =>
      this.context.redis
        .multi()
        .set(this.key(id), value)
        .zadd(this.static.collection, item.createdAt.toString(), id)
        .exec((err) => {
          if (err) return reject(err);
          resolve(item);
        })
    );
  }
  create(item: Partial<T>) {
    const id: string = item.id ?? `${this.static.prefix}_${uuidv4()}`;
    return this.set(id, { ...item, id, createdAt: Date.now() } as T);
  }
  delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      this.context.redis
        .multi()
        .del(this.key(id))
        .zrem(this.static.collection, id)
        .exec((err) => {
          if (err) return reject(err);
          resolve(true);
        })
    );
  }

  async load(ids: string[]): Promise<Array<T | null>> {
    if (!ids.length) return [];
    const keys = ids.map((id) => this.key(id));
    return this.context.redis.mget(keys).then((values) => {
      return values.map((v) => {
        if (!v) return null;
        return JSON.parse(v);
      });
    });
  }

  scan(
    params: { limit?: number; cursor?: number } = {}
  ): Promise<{ items: Array<T | null>; nextCursor: string }> {
    const limit = params.limit ?? 10;
    const cursor = params.cursor ?? 0;
    return this.context.redis
      .scan(cursor, "MATCH", this.key("*"), "COUNT", limit)
      .then(async ([nextCursor, ids]) => {
        return { items: await this.load(ids), nextCursor };
      });
  }

  list(params: ListParams = {}) {
    const min = params.after ?? "-inf";
    const max = params.before ?? "+inf";
    const limit = params.limit ?? 10;
    const offset = params.offset ?? 0;
    return this.context.redis
      .zrevrangebyscore(
        this.static.collection,
        max,
        min,
        "LIMIT",
        offset,
        limit
      )
      .then(this.load.bind(this))
      .then((items) => ({
        items,
        nextOffset: items.length ? offset + limit : null,
      }));
  }
}
