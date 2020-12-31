import { PageContext } from "./types";

export default {
  page: {
    GET: ({ id }: { id: string }, { pages }: PageContext) => {
      return pages.get(id);
    },
  },
};
