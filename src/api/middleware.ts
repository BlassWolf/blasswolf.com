import { IncomingMessage, ServerResponse } from "http";
import { execute } from "graphql";
import context from "./context";
import schema, { dataSources } from "./schema";
import { gql } from "gql";

export default function api(req: IncomingMessage, res: ServerResponse) {
  if (req.method?.toUpperCase() !== "POST") {
    res.statusCode = 405;
    res.write("Method not allowed");
    return res.end();
  }
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("error", () => {
    res.end();
  });
  req.on("end", async () => {
    let payload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.write("Incorrect JSON");
      return res.end();
    }
    try {
      const { query, operationName, variables } = payload;
      const document = gql`
        ${query}
      `;
      const contextValue: any = { ...context, req, res };

      for (let source in dataSources) {
        const DS = dataSources[source];
        contextValue[source] = new DS(context);
      }

      const result = await execute({
        schema,
        document,
        contextValue,
        operationName,
        variableValues: variables,
      });

      const response = JSON.stringify(result);
      res.setHeader("Content-Type", "appplication/json");
      res.setHeader("Content-Length", response.length);
      res.write(response);
      return res.end();
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.write("Something went wrong");
      return res.end();
    }
  });
}
