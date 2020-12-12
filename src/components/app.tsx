import { FunctionalComponent, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Home from "../routes/home";

import NotFoundPage from "../routes/notfound";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

const App: FunctionalComponent = () => {
    let currentUrl: string;
    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    return (
        <div id="app">
            <Router onChange={handleRoute}>
                <Route path="/" component={Home} />

                <NotFoundPage default />
            </Router>
            <footer
                style={{
                    padding: "1rem",
                    color: "rgba(255,255,255,0.25)",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    fontSize: 12
                }}
            >
                &copy;TheWolfSigil, 2020
            </footer>
        </div>
    );
};

export default App;
