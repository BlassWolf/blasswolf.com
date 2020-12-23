import { Redis } from "ioredis";
export type GraphQLContext = {
  redis: Redis;
};

export type ListParams = {
  limit?: number;
  offset?: number;
  after?: number;
  before?: number;
};
