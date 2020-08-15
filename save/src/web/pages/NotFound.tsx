import { h } from "preact";
import { css } from "emotion";
import Link from "../router";

export default function Home() {
    return (
        <div class={style}>
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
