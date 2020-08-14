import Express from "express";
import webServer from "./web/server";

const app = Express();
webServer(app);

app.listen(8080, () => {
    console.log("Listening on http://localhost:8080/");
});
