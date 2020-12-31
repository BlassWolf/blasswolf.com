import { HTTPMethod } from "aws-sdk/clients/xray";
import { APIResolver, APIResolvers } from "./types";
import { paths } from "../config";
import { HTTPMethodNotAllowed, HTTPNotFound } from "./errors";
export default function routeRequest(
  url: URL,
  method: HTTPMethod,
  resolvers: APIResolvers
): APIResolver {
  const path = url.pathname
    .replace(new RegExp(`^${paths.api}\/`, "i"), "")
    .toLowerCase();

  if (!(path in resolvers)) throw new HTTPNotFound();
  if (!(method in resolvers[path]))
    throw new HTTPMethodNotAllowed(Object.keys(resolvers[path]));
  return resolvers[path][method];
}
