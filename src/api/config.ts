import AWS from "aws-sdk";
import { RedisOptions } from "ioredis";

export const redis: RedisOptions = {};

export const s3: AWS.S3.ClientConfiguration = {
  endpoint: new AWS.Endpoint("ams3.digitaloceanspaces.com"),
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
};
