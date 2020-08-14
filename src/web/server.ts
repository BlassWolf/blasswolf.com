import render from "preact-render-to-string";
import { h } from "preact";
import { Request, Response, Express } from "express";
import { minify } from "uglify-js";
import { renderStylesToString } from "emotion-server";
import path from "path";
import App from "./App";
import loadFiles from "../core/loadFiles";
import transpile from "../core/transpile";

export default function webServerMiddleware(app: Express) {
    const files: Map<string, { content: Buffer; type: string }> = loadFiles(
        __dirname
    );

    const assets = loadFiles(path.resolve(process.cwd(), "public"));
    const transpiled = transpile(files, "client.ts");
    // Minify
    transpiled.set("bundle.js", {
        content: minify({ "bundle.js": transpiled.get("bundle.js")!.content })
            .code,
        type: "text/javascript",
    });

    app.use("/public", (req, res) => {
        const filename = req.path.replace(/^\//, "");
        const file = transpiled.has(filename)
            ? transpiled.get(filename)
            : assets.get(filename);
        if (typeof file === "undefined") return res.sendStatus(404);
        res.contentType(file.type);
        return res.send(file.content);
    });

    app.use((_req: Request, res: Response) => {
        const content =
            '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/>' +
            '<meta name="mobile-web-app-capable" content="yes" />' +
            '<meta name="apple-mobile-web-app-capable" content="yes" />' +
            '<link rel="apple-touch-icon" href="/public/icons/apple-touch-icon.png" />' +
            '<link rel="shortcut icon" href="/public/favicon.png" />' +
            '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"/>' +
            "<title>BlassWolf</title>" +
            "</head><body>" +
            render(h(App, null)) +
            '<script>!function(){var n={};window.define=function(t,o,e){function i(t){return n.hasOwnProperty(t)?n[t]():"function"==typeof window[t]?{default:window[t]}:window[t]}n[t]=function(){for(var n={},t=[i,n],d=2;d<o.length;d++){var r=i(o[d]);t.push(r)}return e.apply(null,t),n}},window.addEventListener("DOMContentLoaded",function(){n.client()})}();</script><script src="/public/bundle.js"></script>' +
            '<script src="https://cdn.jsdelivr.net/npm/htm@3.0.4/mini/index.js"></script>' +
            '<script src="https://cdn.jsdelivr.net/npm/preact@10.4.7/dist/preact.min.js"></script>' +
            '<script src="https://cdn.jsdelivr.net/npm/emotion@10.0.27/dist/emotion.umd.min.js"></script>' +
            "</body></html>";

        res.type(".html");
        res.send(renderStylesToString(content));
    });
}
