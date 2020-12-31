import { html } from "web/lib";

export default (
  body,
  {
    title,
    schema,
    style,
  }: { title?: string; schema?: string; style?: string } = {}
) => (url: URL) => html`<!DOCTYPE html>
  <html amp lang="en">
    <head>
      <meta charset="utf-8" />
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <title>${title ?? ""}</title>
      <link rel="canonical" href="${url.toString()}" />
      <meta name="viewport" content="width=device-width" />
      ${schema ?? ""}
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
        /* any custom style goes here */
        body {
          background-color: black;
          color: white;
        }
        ${style ?? ""}
      </style>
    </head>
    <body>
      <header class="headerbar">
        <a href="/"> Home </a>
        <div class="site-name">The Wolf Sigil</div>
      </header>
      ${body ?? ""}
    </body>
  </html>`;
