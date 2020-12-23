import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import * as core from "./core";
import * as journal from "./journal";
import * as pages from "./pages";

const { typeDefs, resolvers, directiveResolvers, dataSources } = ([
  core,
  journal,
  pages,
] as any).reduce(
  (a, c) => {
    if (c.typeDefs) a.typeDefs.push(c.typeDefs);
    if (c.resolvers) a.resolvers.push(c.resolvers);
    if (c.directiveResolvers)
      Object.assign(a.directiveResolvers, c.directiveResolvers);
    if (c.dataSources) Object.assign(a.dataSources, c.dataSources);
    return a;
  },
  {
    typeDefs: [],
    resolvers: [],
    directiveResolvers: {},
    dataSources: {},
  }
);

export default makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers) as any,
  directiveResolvers,
});

export { dataSources };
