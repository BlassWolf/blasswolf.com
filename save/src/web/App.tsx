import { injectGlobal, css } from "emotion";
import { h, Component, Fragment } from "preact";
import { Router } from "./router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

injectGlobal`
html,
body {
    min-height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    background: #000000;
    font-family: "Montserrat", arial, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
* {
    box-sizing: border-box;
}
`;
export default class App extends Component<{ path?: string }> {
    render() {
        return (
            <Fragment>
                <Router
                    path={this.props.path}
                    routes={{
                        "/": Home,
                    }}
                    notFound={NotFound}
                />
                <footer
                    class={css`
                        padding: 1rem;
                        color: rgba(255, 255, 255, 0.25);
                        border-top: 1px solid rgba(255, 255, 255, 0.08);
                        font-size: 12;
                    `}
                >
                    &copy;BlassWolf, 2020
                </footer>
            </Fragment>
        );
    }
}
