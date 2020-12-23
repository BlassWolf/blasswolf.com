import { IncomingMessage, ServerResponse } from "http";

export default function api(req: IncomingMessage, res: ServerResponse) {
  res.write("Hello from admin panel");
  res.end();
}
