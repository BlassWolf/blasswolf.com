import DataSource from "api/DataSource";
import { Page } from "./types";

export default class Journal extends DataSource<Page> {
  static collection: string = "pages";
  static prefix: string = "pg";
}
