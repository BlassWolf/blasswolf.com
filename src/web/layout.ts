import { html } from "web/lib";
import header from "./header";
import styles from "./styles";

export default (
  body,
  {
    title,

    style,
    scripts,
  }: { title?: string; style?: string; scripts?: string } = {}
) => (url: URL) => html`<!DOCTYPE html>
  <html amp lang="en">
    <head>
      <meta charset="utf-8" />
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <title>${title ?? ""}</title>
      <link rel="canonical" href="${url.toString()}" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400&family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <meta name="viewport" content="width=device-width" />
      <script
        async
        custom-element="amp-sidebar"
        src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
      ></script>
      ${scripts ?? ""}
      <style amp-boilerplate>
        body {
          -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
          -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
          -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
          animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        }
        @-webkit-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @-moz-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @-ms-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @-o-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
      </style>
      <noscript>
        <style amp-boilerplate>
          body {
            -webkit-animation: none;
            -moz-animation: none;
            -ms-animation: none;
            animation: none;
          }
        </style>
      </noscript>
      <style amp-custom>
        ${styles(style)}
      </style>
    </head>
    <body>
      ${header} ${body ?? ""}
    </body>
  </html>`;
