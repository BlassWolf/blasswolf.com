import { PageContext, Page } from "./types";
import makeCRUD from "api/makeCRUD";
import { APIContext } from "api/types";

export default makeCRUD<APIContext & PageContext, Page>(
  "entry",
  "entries",
  "journal"
);
