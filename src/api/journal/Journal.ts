import DataSource from "api/DataSource";
import { JournalEntry, JournalInput } from "./types";

export default class Journal extends DataSource<JournalEntry> {
  static collection: string = "journal";
  static prefix: string = "jrn";

  validate(input: JournalInput, newItem?: boolean) {
    const errors = [];
    if (newItem) {
      if (!input.title)
        errors.push({ name: "title", message: "Please provide title" });
      if (!input.content)
        errors.push({ name: "content", message: "Please provide content" });
    } else {
      if ("title" in input && !input.title)
        errors.push({ name: "title", message: "Please provide title" });
      if ("content" in input && !input.content)
        errors.push({ name: "content", message: "Please provide content" });
    }

    return errors;
  }
}
