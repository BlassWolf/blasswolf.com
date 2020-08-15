import fs from "fs";
import path from "path";
import mime from "mime";

mime.define({ "text/javascript": ["ts", "tsx"] }, true);

export default function loadFiles(dir: string, basePath: string = "") {
  const files = new Map<string, { content: Buffer; type: string }>();
  const entries = fs.readdirSync(dir);
  for (let entry of entries) {
    const info = fs.statSync(path.join(dir, entry));

    if (info.isDirectory()) {
      const tmp = loadFiles(path.join(dir, entry), path.join(basePath, entry))[
        Symbol.iterator
      ]();
      for (let el of tmp) {
        files.set(el[0], el[1]);
      }
      continue;
    }
    const filepath = path.join(basePath, entry);
    files.set(filepath, {
      content: fs.readFileSync(path.join(dir, entry)),
      type: mime.getType(filepath) || "text/text",
    });
  }
  return files;
}
