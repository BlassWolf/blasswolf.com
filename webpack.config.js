const path = require("path");
module.exports = {
    mode: "production",
    entry: "./src/web/client.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".tsx", ".js", ".mjs", ".json", ".ts"],
    },
    module: {
        rules: [{ test: /\.(t|j)sx?$/, use: "ts-loader" }],
    },
};
