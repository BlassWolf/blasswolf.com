import { JournalEntry } from "api/journal/types";

const html = String.raw;

export function renderArticle({
  description,
  images,
  title,
  content,
  createdAt,
  updatedAt,
  alias,
  id,
}: JournalEntry) {
  const image = images?.length ? images[0] : null;
  const meta = {
    "@context": "http://schema.org",
    "@type": "BlogArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thewolfsigil.com/journal/${alias ?? id}`,
    },
    headline: title,
    image: images,
    datePublished: new Date(createdAt).toISOString(),
    dateModified: updatedAt ? new Date(updatedAt).toISOString() : "",
    author: {
      "@type": "Person",
      name: "Wolf",
    },
    publisher: {
      "@type": "Organization",
      name: "The Wolf Sigil",
      logo: {
        "@type": "ImageObject",
        url: "https://thewolfsigil.com/assets/logo.png",
      },
    },
    description,
  };
  return html`<!DOCTYPE html>
    <html ⚡>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content=${description ?? ""} />
        <link
          rel="preload"
          as="script"
          href="https://cdn.ampproject.org/v0.js"
        />
        <link rel="preload" href=${image} as="image" />
        <link
          rel="preconnect dns-prefetch"
          href="https://fonts.gstatic.com/"
          crossorigin
        />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <!-- Import other AMP Extensions here -->
        <link
          href="https://fonts.googleapis.com/css?family=Lato"
          rel="stylesheet"
        />
        <style amp-custom>
          /* Add your styles here */
        </style>
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
        <noscript
          ><style amp-boilerplate>
            body {
              -webkit-animation: none;
              -moz-animation: none;
              -ms-animation: none;
              animation: none;
            }
          </style></noscript
        >
        <link rel="canonical" href="." />
        <title>${title}</title>
        <script type="application/ld+json">
          ${JSON.stringify(meta)}
        </script>
      </head>
      <body>
        <h1>${title}</h1>
        ${image &&
        `<amp-img
          src=${image.url}
          width=${image.width}
          height=${image.height}
          layout="responsive"
          alt="${image.alt}"
        >
        </amp-img>`}
        <main>${content}</main>
      </body>
    </html>`;
}
