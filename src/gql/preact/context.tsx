import { h, createContext, ComponentChildren } from "preact";
import { GraphQLClientInterface } from "../client";

export const GraphQLContext = createContext<{
  client: GraphQLClientInterface;
}>({ client: {} as any });

export const GraphQLProvider = ({
  client,
  children,
}: {
  client: GraphQLClientInterface;
  children: ComponentChildren;
}) => {
  return (
    <GraphQLContext.Provider value={{ client }}>
      {children}
    </GraphQLContext.Provider>
  );
};
