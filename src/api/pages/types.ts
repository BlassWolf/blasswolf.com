import { APIItem } from "api/types";
import Pages from "./Pages";

export type PageInput = {
  title: string;
  content: string;
  images?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
  description?: string;
};

export type Page = APIItem & PageInput;

export type PageContext = {
  pages: Pages;
};
