import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import pages, { NotFound } from "./pages";

export default async function api(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("content-type", "text/html");
  const url = new URL(req.url ?? "", "http://localhost:8080");

  const page = pages[url.pathname] ?? NotFound;
  const html = await page(url);
  res.setHeader("content-length", html.length);
  res.write(html);
  res.end();
}
