import fs from "fs";
import path from "path";
import mime from "mime";

mime.define({ "text/javascript": ["ts", "tsx"] }, true);

export default function loadFiles(dir: string, absolutePath?: boolean) {
    const files = new Map<string, { content: string; type: string }>();
    const entries = fs.readdirSync(dir);
    for (let entry of entries) {
        const info = fs.statSync(path.join(dir, entry));

        if (info.isDirectory()) {
            const tmp = loadFiles(path.join(dir, entry), true)[
                Symbol.iterator
            ]();
            for (let el of tmp) {
                files.set(el[0], el[1]);
            }
            continue;
        }
        const filepath = absolutePath ? path.join(dir, entry) : entry;
        files.set(filepath, {
            content: fs.readFileSync(path.join(dir, entry)).toString(),
            type: mime.getType(filepath) || "text/text",
        });
    }
    return files;
}
