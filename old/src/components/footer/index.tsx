import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

const Footer: FunctionalComponent = () => {
    return <footer class={style.footer}>&copy;TheWolfSigil, 2020</footer>;
};

export default Footer;
