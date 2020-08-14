import render from "preact-render-to-string";
import { h } from "preact";
import { Request, Response, Express } from "express";
import { minify } from "uglify-js";

import App from "./App";
import loadFiles from "../core/loadFiles";
import transpile from "../core/transpile";

export default function webServerMiddleware(app: Express) {
    const files: Map<string, { content: string; type: string }> = loadFiles(
        __dirname
    );

    const transpiled = transpile(files, "client.ts");
    // Minify
    transpiled.set("bundle.js", {
        content: minify({ "bundle.js": transpiled.get("bundle.js")!.content })
            .code,
        type: "text/javascript",
    });

    app.use("/public", (req, res) => {
        const file = transpiled.get(req.path.replace(/^\//, ""));
        if (typeof file === "undefined") return res.sendStatus(404);
        res.contentType(file.type);
        return res.send(file.content);
    });

    app.use((req: Request, res: Response) => {
        const content = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>BlassWolf</title>
            </head>
            <body>
                ${render(h(App, null))}
                <script>!function(){var n={};window.define=function(t,o,e){function i(t){return n.hasOwnProperty(t)?n[t]():"function"==typeof window[t]?{default:window[t]}:window[t]}n[t]=function(){for(var n={},t=[i,n],d=2;d<o.length;d++){var r=i(o[d]);t.push(r)}return e.apply(null,t),n}},window.addEventListener("DOMContentLoaded",function(){n.client()})}();</script>
                <script src="/public/bundle.js"></script>
               <script src="https://cdn.jsdelivr.net/npm/htm@3.0.4/mini/index.js"></script>
               <script src="https://cdn.jsdelivr.net/npm/preact@10.4.7/dist/preact.min.js"></script>
            </body>
        </html>`;
        res.type(".html");
        res.send(content);
    });
}
