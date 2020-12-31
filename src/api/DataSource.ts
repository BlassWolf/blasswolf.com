import { APIContext, APIItem, ListParams } from "./types";
import { v4 as uuidv4 } from "uuid";

export default class DataSource<T extends APIItem, I = Partial<T>> {
  static collection: string = "items";
  static prefix: string = "itm";

  constructor(public context: Partial<APIContext>) {
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

  async set(id: string, item: I): Promise<T> {
    const previous = await this.get(id);
    const merged = previous
      ? {
          ...previous,
          ...item,
          id,
          updatedAt: Date.now(),
        }
      : { id, ...item };

    const value = JSON.stringify(merged);
    return new Promise((resolve, reject) =>
      this.context.redis
        .multi()
        .set(this.key(id), value)
        .zadd(
          this.static.collection,
          (merged["createdAt"] ?? Date.now()).toString(),
          id
        )
        .exec((err) => {
          if (err) return reject(err);
          resolve(merged as T);
        })
    );
  }
  create(item: I) {
    const id: string =
      "id" in item ? item["id"] : `${this.static.prefix}_${uuidv4()}`;
    return this.set(id, { ...item, id, createdAt: Date.now() });
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
      .then((ids) => this.load(ids))
      .then((items) => ({
        items,
        nextOffset: items.length ? offset + limit : null,
      }));
  }
}
