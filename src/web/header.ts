import { html } from "./lib";
import logo from "./logo";

export default html`
  <header class="tws-header">
    <div
      role="button"
      aria-label="open sidebar"
      on="tap:header-sidebar.toggle"
      tabindex="0"
      class="tws-sidebar-trigger"
    >
      ☰
    </div>
    <div class="tws-header-name">The Wolf Sigil</div>
  </header>
  <amp-sidebar id="header-sidebar" class="tws-sidebar" layout="nodisplay">
    <div class="tws-sidebar-header">
      <div
        role="button"
        aria-label="close sidebar"
        on="tap:header-sidebar.toggle"
        tabindex="0"
        class="tws-sidebar-trigger"
      >
        ✕
      </div>
    </div>
    <nav class="tws-sidebar-wrapper">
      <ul class="tws-sidebar-nav">
        <li class="tws-sidebar-nav-item">
          <a class="tws-sidebar-nav-link" href="/">Home</a>
        </li>
        <li class="tws-sidebar-nav-item">
          <a class="tws-sidebar-nav-link" href="/about">About</a>
        </li>
        <li class="tws-sidebar-nav-item">
          <a class="tws-sidebar-nav-link" href="/stories">Stories</a>
        </li>
        <li class="tws-sidebar-nav-item">
          <a class="tws-sidebar-nav-link" href="/books">Books</a>
        </li>
        <li class="tws-sidebar-nav-item">
          <a class="tws-sidebar-nav-link" href="/shop">Shop</a>
        </li>
      </ul>
    </nav>
  </amp-sidebar>
`;
