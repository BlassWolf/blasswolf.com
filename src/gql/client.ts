import { GraphQLQuery } from "./types";
import fetch from "axios";
import { ExecutionResult, execute, GraphQLSchema } from "graphql";

export type Headers = { [key: string]: string };

export interface GraphQLClientInterface {
  execute: (
    query: GraphQLQuery,
    variables?: { [key: string]: any },
    operationName?: string
  ) => Promise<ExecutionResult>;
}

export default class GraphQLClient implements GraphQLClientInterface {
  constructor(
    private options: {
      endpoint: string;
      headers?: Headers | (() => Headers | Promise<Headers>);
    }
  ) {
    this.options = options;
  }
  async execute(
    query: GraphQLQuery,
    variables?: { [key: string]: any },
    operationName?: string
  ) {
    const headers =
      (typeof this.options.headers === "function"
        ? await this.options.headers()
        : this.options.headers) ?? {};
    const data = JSON.stringify({
      query: query.text,
      variables,
      operationName,
    });
    return fetch({
      url: this.options.endpoint,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      method: "POST",
      data,
    }).then((result: ExecutionResult) => result.data as any);
  }
}

export class GraphQLMockClient implements GraphQLClientInterface {
  constructor(private schema: GraphQLSchema, public context?: any) {
    this.schema = schema;
    this.context = context;
  }
  async execute(
    query: GraphQLQuery,
    variables?: { [key: string]: any },
    operationName?: string
  ) {
    return execute({
      schema: this.schema,
      document: query,
      operationName,
      variableValues: variables ?? {},
      contextValue: this.context,
    });
  }
}
