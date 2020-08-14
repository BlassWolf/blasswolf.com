import { h, hydrate } from "preact";
import { hydrate as eh } from "emotion";
import App from "./App";
try {
    const ids = document
        .querySelector("style[data-emotion-css]")
        ?.getAttribute("data-emotion-css")
        ?.split(" ");
    if (ids) {
        eh(ids);
    }
} catch (error) {
    console.error(error);
}
hydrate(h(App, null), document.body);
