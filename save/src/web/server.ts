import render from "preact-render-to-string";
import { h } from "preact";
import { Request, Response, Express } from "express";
import { extractCritical } from "emotion-server";
import path from "path";
import App from "./App";
import loadFiles from "../core/loadFiles";
import transpile from "../core/transpile";

export default function webServerMiddleware(app: Express) {
    const assets = loadFiles(path.resolve(process.cwd(), "public"));
    const files = loadFiles(path.resolve(__dirname));
    const transpiled = transpile(files, "client.ts");
    console.log(transpiled);
    app.use("/public", (req, res) => {
        const filename = req.path.replace(/^\//, "");
        const file = assets.get(filename);
        if (typeof file === "undefined") return res.sendStatus(404);
        res.contentType(file.type);
        return res.send(file.content);
    });

    app.use((req: Request, res: Response) => {
        const { html, ids, css } = extractCritical(
            //@ts-ignore
            render(h(App, { path: req.path }))
        );
        const content =
            '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/>' +
            '<meta name="mobile-web-app-capable" content="yes" />' +
            '<meta name="apple-mobile-web-app-capable" content="yes" />' +
            '<link rel="apple-touch-icon" href="/public/icons/apple-touch-icon.png" />' +
            '<link rel="shortcut icon" href="/public/favicon.png" />' +
            '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"/>' +
            "<title>BlassWolf</title>" +
            "</head><body>" +
            html +
            `<style data-emotion-css="${ids.join(" ")}">` +
            css +
            "</style>" +
            '<script src="/public/bundle.js"></script>' +
            "</body></html>";
        res.type(".html");
        res.send(content);
    });
}
