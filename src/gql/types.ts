import { DocumentNode } from "graphql";
export type GraphQLQuery = DocumentNode & { text: string };
