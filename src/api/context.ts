import Redis from "ioredis";
import AWS from "aws-sdk";
import { redis, s3 } from "./config";

export default {
  redis: new Redis(redis),
  s3: new AWS.S3(s3),
};
