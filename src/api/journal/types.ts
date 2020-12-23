import Journal from "./Journal";

export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  images?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
  description?: string;
  alias?: string;
  updatedAt?: number;
};

export type JournalContext = {
  journal: Journal;
};
