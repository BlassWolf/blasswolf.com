import { FunctionalComponent, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Home from "../routes/home";
import Journal from "../routes/journal";
import Entry from "../routes/journal/entry";

import NotFoundPage from "../routes/notfound";
import Footer from "./footer";
import Header from "./header";

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
        <>
            <Header />
            <main>
                <Router onChange={handleRoute}>
                    <Route path="/journal/:entry" component={Entry} />
                    <Route path="/journal" component={Journal} />
                    <Route path="/" component={Home} />
                    <NotFoundPage default />
                </Router>
            </main>
            <Footer />
        </>
    );
};

export default App;
