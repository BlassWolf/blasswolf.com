import makeCRUD from "api/makeCRUD";
import { APIContext } from "api/types";
import { JournalContext, JournalEntry, JournalInput } from "./types";

import Journal from "./Journal";

export const dataSources = {
  journal: Journal,
};

export const resolvers = makeCRUD<
  APIContext & JournalContext,
  JournalEntry,
  JournalInput
>("entry", "entries", "journal");
