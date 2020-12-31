import context from "./context";
import DataSource from "./DataSource";

export type MaybePromise<T> = Promise<T> | T;

export type LogFunction = (...args: any) => void;

export type APILogger = Record<"error" | "info" | "log" | "warn", LogFunction>;

export type APIContext = typeof context & Record<string, DataSource<any>>;

export type APIItem = {
  id: string;
  [key: string]: any;
  createdAt: number;
  updatedAt?: number;
};

export type APIResolver<P = any, C = any, R = any> = (
  params: P,
  context: APIContext & C
) => MaybePromise<R>;

export type APIResolvers = Record<
  string,
  Partial<Record<"GET" | "POST" | "PATCH" | "DELETE", APIResolver>>
>;

export type APIModule = {
  dataSources: Record<string, DataSource<any>>;
  resolvers;
};

export type ListParams = {
  limit?: number;
  offset?: number;
  after?: number;
  before?: number;
};

export type Paginated<T> = {
  items: T[];
  nextOffset: number;
};
