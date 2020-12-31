import { mergeDeepRight } from "ramda";
import * as journal from "./journal";
import * as pages from "./pages";

export default mergeDeepRight(journal, pages);
