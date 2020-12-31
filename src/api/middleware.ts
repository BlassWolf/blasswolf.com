import { IncomingMessage, ServerResponse } from "http";
import querystring from "querystring";
import { Readable } from "stream";
import { IncomingForm } from "formidable";
import { url as baseUrl } from "../config";
import { HTTPNotFound } from "./errors";
import routeRequest from "./routeRequest";
import { APILogger, APIResolvers } from "./types";

export default function api<T extends { log: APILogger }>(
  resolvers: APIResolvers,
  context: T
) {
  const log = context.log;
  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      res.setHeader("Content-Type", "application/json");
      const method = req.method?.toUpperCase();
      const url = new URL(req.url, baseUrl);
      const resolver = routeRequest(url, method, resolvers);
      const params = {};
      for (const [key, value] of url.searchParams) {
        params[key] = value;
      }
      let input;
      let files;

      if (["POST", "PATCH", "PUT"].includes(method)) {
        if (req.headers["content-type"].startsWith("multipart/form-data")) {
          input = await new Promise((resolve, reject) => {
            new IncomingForm({ multiples: true } as any).parse(
              req,
              (err, fields, incomingFiles) => {
                if (err) return reject(err);
                files = incomingFiles;
                resolve(fields);
              }
            );
          });
        } else {
          input = await body(req);
          switch (req.headers["content-type"]) {
            case "application/json": {
              input = JSON.parse(input);
              break;
            }
            case "application/x-www-form-urlencoded":
              input = querystring.parse(input);
              break;
          }
        }
      }
      const response = await resolver({ ...params, input, files }, context);
      const sendResponse = (code: number, response: object) => {
        res.statusCode = code;
        res.write(JSON.stringify(response));
        res.end();
      };

      if (!response) {
        throw new HTTPNotFound();
      }
      const code = "code" in response ? response.code : 200;
      return sendResponse(code, response);
    } catch (error) {
      res.statusCode = "code" in error ? error.code : 500;
      let message = error.message;
      if (res.statusCode >= 500) {
        log.error(error);
        message = "Internal Server Error";
      }
      res.write(
        JSON.stringify({
          error: message,
          code: res.statusCode,
        })
      );
      res.end();
    }
  };
}

export function body(stream: Readable) {
  return new Promise((resolve, reject) => {
    let body = "";
    stream.on("data", (chunk) => {
      body += chunk.toString();
    });
    stream.on("end", () => {
      resolve(body);
    });
    stream.on("error", (error) => {
      reject(error);
    });
  });
}
