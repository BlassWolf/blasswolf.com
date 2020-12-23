import DataSource from "api/DataSource";
import { JournalEntry } from "./types";

export default class Journal extends DataSource<JournalEntry> {
  static collection: string = "journal";
  static prefix: string = "jrn";
}
