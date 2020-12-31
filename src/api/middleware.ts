import { IncomingMessage, ServerResponse } from "http";
import querystring from "querystring";
import { Readable } from "stream";
import { url as baseUrl } from "../config";
import { HTTPServerError } from "./errors";
import routeRequest from "./routeRequest";
import { APILogger, APIResolvers } from "./types";

export default function api<T extends { log: APILogger }>(
  resolvers: APIResolvers,
  context: T
) {
  const log = context.log;
  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const method = req.method?.toUpperCase();
      const url = new URL(req.url, baseUrl);
      const resolver = routeRequest(url, method, resolvers);
      const params = url.search
        ? querystring.parse(url.search.replace(/^\?/, ""))
        : {};
      let input;
      if (["POST", "PATCH"].includes(method)) {
        input = await body(req);
        if (req.headers["content-type"] === "application/json") {
          input = JSON.parse(input);
        }
      }
      const response = await resolver({ ...params, input }, context);
      const sendResponse = (code: number, response: object) => {
        res.statusCode = code;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(response));
        res.end();
      };

      if (typeof response !== "object") {
        log.error(`Received non-object response`, { url, method });
        throw new HTTPServerError();
      }
      const code = "code" in response ? response.code : 200;
      return sendResponse(code, response);
    } catch (error) {
      res.statusCode = "code" in error ? error.code : 500;
      if (res.statusCode >= 500) {
        log.error(error);
        res.write("Internal Server Error");
      } else {
        res.write(error.message);
      }
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
