import { Server } from "http";
import { port, paths } from "config";

import api from "./api";
import web from "web/middleware";
import admin from "admin/middleware";

const server = new Server((req, res) => {
  if (req.url?.startsWith(paths.api)) return api(req, res);
  if (req.url?.startsWith(paths.admin)) return admin(req, res);
  return web(req, res);
});

server.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
