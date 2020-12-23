import { PageContext } from "./types";

export default {
  Query: {
    page: (_, { id }: { id: string }, { pages }: PageContext) => {
      return pages.get(id);
    },
  },
};
