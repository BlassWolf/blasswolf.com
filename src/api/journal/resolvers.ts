import { APIResolver, APIResolvers, ListParams, Paginated } from "api/types";
import { JournalContext, JournalEntry, JournalInput } from "./types";

const getEntry: APIResolver<{ id: string }, JournalContext, JournalEntry> = (
  params,
  { journal }
) => {
  return journal.get(params.id);
};

const listEntries: APIResolver<
  ListParams,
  JournalContext,
  Paginated<JournalEntry>
> = (params, { journal }) => {
  return journal.list(params);
};

const createEntry: APIResolver<JournalInput, JournalContext, JournalEntry> = (
  input,
  { journal }
) => {
  return journal.create(input);
};

export default {
  entry: {
    GET: getEntry,
    POST: createEntry,
  },
  entries: {
    GET: listEntries,
  },
} as APIResolvers;
