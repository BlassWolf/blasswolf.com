import { IncomingMessage, ServerResponse } from "http";
import querystring from "querystring";
import context from "./context";
import core from "./core";
import DataSource from "./DataSource";
import { url as baseUrl } from "../config";
import routeRequest from "./routeRequest";
import { resolve } from "path";
import { reject } from "ramda";

const dataSources: Record<
  keyof typeof core.dataSources,
  DataSource<any>
> = {} as any;

for (let dataSource in core.dataSources) {
  dataSources[dataSource] = new core.dataSources[dataSource](context);
}

export default async function api(req: IncomingMessage, res: ServerResponse) {
  try {
    const method = req.method?.toUpperCase();
    const url = new URL(req.url, baseUrl);
    const ctx = { ...context, ...dataSources };
    const resolver = routeRequest(url, method, core.resolvers);
    const params = url.search ? querystring.parse(url.search) : {};
    let input;
    if (["POST", "PATCH"].includes(method)) {
      input = await body(req);
      if (req.headers["content-type"] === "application/json") {
        input = JSON.parse(input);
      }
    }
    const response = await resolver({ ...params, input }, ctx);
    res.statusCode = 200;
    res.write(JSON.stringify(response));
    res.end();
  } catch (error) {
    res.statusCode = "code" in error ? error.code : 500;
    res.write(error.message);
    res.end();
  }
}

export function body(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", (error) => {
      reject(error);
    });
  });
}
