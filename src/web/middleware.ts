import { IncomingMessage, ServerResponse } from "http";

export default function api(req: IncomingMessage, res: ServerResponse) {
  res.write("Hello from web");
  res.end();
}
