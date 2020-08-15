import React from "react";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div css={style}>
      <h1>Error 404</h1>
      <p>That page doesn&apos;t exist.</p>
      <Link to="/">
        <h4>Back to Home</h4>
      </Link>
    </div>
  );
}

const style = css`
  height: 100%;
  padding: 0 5%;
  margin: 100px 0;
`;
