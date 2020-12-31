import Pages from "./Pages";
import { PageContext, Page } from "./types";
import makeCRUD from "api/makeCRUD";
import { APIContext } from "api/types";

export const dataSources = {
  pages: Pages,
};

export const resolvers = makeCRUD<APIContext & PageContext, Page>(
  "page",
  "pages"
);
