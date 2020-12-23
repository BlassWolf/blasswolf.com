import Pages from "./Pages";

export type Page = {
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
  updatedAt?: number;
};

export type PageContext = {
  pages: Pages;
};
