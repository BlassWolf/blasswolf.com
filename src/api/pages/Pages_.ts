import DataSource from "api/DataSource";
import { Page } from "./types";

export default class Pages extends DataSource<Page> {
  static collection: string = "pages";
  static prefix: string = "pg";
}
