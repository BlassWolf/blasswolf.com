import { APIItem } from "api/types";
import Journal from "./Journal";

export type JournalInput = {
  title: string;
  content: string;
  images?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
  description?: string;
  alias?: string;
};

export type JournalEntry = JournalInput & APIItem;

export type JournalContext = {
  journal: Journal;
};
