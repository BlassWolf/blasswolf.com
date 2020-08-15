const path = require("path");
const WorkboxPlugin = require("workbox-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "production",
    entry: "./src/web/client.ts",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".tsx", ".js", ".mjs", ".json", ".ts"],
    },
    module: {
        rules: [{ test: /\.(t|j)sx?$/, use: "ts-loader" }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            inject: false,
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            navigateFallback: "/public/index.html",
        }),
    ],
};
