import DataSource from "api/DataSource";
import { Page, PageInput } from "./types";

export default class Pages extends DataSource<Page> {
  static collection: string = "pages";
  static prefix: string = "pg";

  validate(input: PageInput, newItem?: boolean) {
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
