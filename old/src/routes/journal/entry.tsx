import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
const Entry: FunctionalComponent = () => {
    return (
        <div class={style.main}>
            <span class={style.date}>Stockholm, today</span>
            <h1>We have arrived in Stockholm.</h1>
            <p>
                The short days of December and crisp cold air suits me; I can
                finally organize my thoughts without worrying about the constant
                sunlight assaulting my eyes.
            </p>
            <p>
                I feel strong, which comes as no surprise; I had little choice
                after being locked with a hundred other people inside that
                plane.
            </p>
            <p>
                We left the aircraft carrying a little bit of the vitality of
                each one of them.
            </p>
            <p>
                I can hear her clearly in my head and almost feel her in my
                skin.
            </p>
            <div class={style.split} />
            <p>
                <em>Isn't this perfect...?! The North feels more like home.</em>
            </p>
            <p>
                <em>As usual, I was right.</em>
            </p>
            <p>
                <em>
                    I can feel my reach grow and spread through these old
                    streets and alleys, fed by the lives and memories of so
                    many.
                </em>
            </p>
            <p>
                <em>
                    Maybe I can convince Wolf to do some...exploring before
                    dawn.
                </em>
            </p>
        </div>
    );
};
export default Entry;
