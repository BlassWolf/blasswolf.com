import { css, html } from "web/lib";
import layout from "../layout";

export default layout(
  html`
    <h1>The wolf sigil</h1>
    <amp-img
      src="https://thewolfsigil.com/b87ff12070942e72cf09d5080b0ac121.svg"
      alt="Welcome"
      height="256"
      width="256"
    ></amp-img>
    <amp-list layout="fixed-height" height="100" src="/api/pages" binding="no">
      <template type="amp-mustache">
        <div>{{title}}</div>
      </template>
    </amp-list>
  `,
  {
    title: "Welcome",
    scripts: html`<script
        async
        custom-element="amp-list"
        src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
      ></script>
      <script
        async
        custom-template="amp-mustache"
        src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
      ></script>
      <script
        async
        custom-element="amp-bind"
        src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
      ></script>
      <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "NewsArticle",
          "headline": "Open-source framework for publishing content",
          "datePublished": "2015-10-07T12:02:41Z",
          "image": ["logo.jpg"]
        }
      </script>`,
  }
);
