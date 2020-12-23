import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import * as style from "./style.css";

const Journal: FunctionalComponent = () => {
    return (
        <>
            <h1>
                Wolf &amp; <em>Name</em>'s Journal
            </h1>
            <div class={style.articles}>
                <Link
                    href="/journal/we-arrived-in-stockholm"
                    class={style.entry}
                >
                    <article class={style.article}>
                        <span class={style.date}>Stockholm, today</span>
                        <h2>We have arrived in Stockholm.</h2>
                        <p class={style.intro}>
                            The short days of December and crisp cold air suits
                            me; I can finally organize my thoughts without
                            worrying about the constant sunlight assaulting my
                            eyes...
                        </p>
                    </article>
                </Link>
                <Link
                    href="/journal/we-arrived-in-stockholm"
                    class={style.entry}
                >
                    <article class={style.article}>
                        <span class={style.date}>Stockholm, today</span>
                        <h2>We have arrived in Stockholm.</h2>
                        <p class={style.intro}>
                            The short days of December and crisp cold air suits
                            me; I can finally organize my thoughts without
                            worrying about the constant sunlight assaulting my
                            eyes...
                        </p>
                    </article>
                </Link>
                <Link
                    href="/journal/we-arrived-in-stockholm"
                    class={style.entry}
                >
                    <article class={style.article}>
                        <span class={style.date}>Stockholm, today</span>
                        <h2>We have arrived in Stockholm.</h2>
                        <p class={style.intro}>
                            The short days of December and crisp cold air suits
                            me; I can finally organize my thoughts without
                            worrying about the constant sunlight assaulting my
                            eyes...
                        </p>
                    </article>
                </Link>
            </div>
        </>
    );
};

export default Journal;
