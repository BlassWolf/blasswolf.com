import React from "react";
import { Switch, Route } from "react-router";
import { Global, css } from "@emotion/core";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Global
        styles={css`
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
        `}
      />

      <Switch>
        <Route path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
      <footer
        css={css`
          padding: 1rem;
          color: rgba(255, 255, 255, 0.25);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
        `}
      >
        ©BlassWolf, 2020
      </footer>
    </>
  );
}

export default App;
