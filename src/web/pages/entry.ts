import { html } from "web/lib";

export default () => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>News Article</title>

      <link href="base.css" rel="stylesheet" />

      <script type="text/javascript" src="base.js"></script>
    </head>
    <body>
      <header>News Site</header>
      <article>
        <h1>Article Name</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
          tortor sapien, non tristique ligula accumsan eu.
        </p>
      </article>
      <img src="mountains.jpg" />
    </body>
  </html>
`;