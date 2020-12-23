import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import logo from "../../assets/thewolfsigil.svg";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <Link href="/" class={style.logo}>
                <img src={logo} alt="The Wolf Sigil" />
            </Link>
            <nav class={style.nav}>
                <ul class={style.menu}>
                    <li>
                        <Link href="/about" activeClassName={style.active}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/books" activeClassName={style.active}>
                            Books
                        </Link>
                    </li>
                    <li>
                        <Link href="/journal" activeClassName={style.active}>
                            Journal
                        </Link>
                    </li>
                    <li>
                        <a href="https://shop.thewolfsigil.com" target="_blank">
                            Shop
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
