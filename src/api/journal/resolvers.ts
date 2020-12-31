import makeCRUD from "api/makeCRUD";
import { APIContext } from "api/types";
import { JournalContext, JournalEntry, JournalInput } from "./types";

export default makeCRUD<
  APIContext & JournalContext,
  JournalEntry,
  JournalInput
>("entry", "entries", "journal");
