import { html } from "web/lib";
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
  `,
  {
    title: "Welcome",
    schema: html`<script type="application/ld+json">
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
