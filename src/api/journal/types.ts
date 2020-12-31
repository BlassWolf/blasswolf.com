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

export type JournalEntry = JournalInput & {
  id: string;
  updatedAt?: number;
  createdAt: number;
};

export type JournalContext = {
  journal: Journal;
};
