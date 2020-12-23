import { ListParams } from "api/types";
import { JournalContext } from "./types";

export default {
  Query: {
    entries: (_, params: ListParams, { journal }: JournalContext) => {
      return journal.list(params);
    },
  },
};
