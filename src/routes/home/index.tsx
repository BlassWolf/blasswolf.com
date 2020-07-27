import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import logo from "./logo.svg";
import bg from "./bg.mp4";
const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <img src={logo} alt="BlassWolf" class={style.logo} />
            <div class={style["video-wrapper"]}>
                <video
                    class={style.video}
                    src={bg}
                    loop
                    autoPlay
                    muted
                    playsInline
                />
            </div>
            <div class={style.content}>
                <header class={style.header}>Coming Soon</header>
                <h1 class={style.h1}>Read the next story first</h1>
                <form
                    class={style.form}
                    action="https://app.mailjet.com/widget/iframe/5ItF/Euc"
                    method="POST"
                >
                    <input
                        type="email"
                        placeholder="Your email"
                        class={style.input}
                        name="w-field-field-155632-1006756-1362615-email"
                    />
                    <input
                        type="hidden"
                        id="csrf_token"
                        name="csrf_token"
                        value="NGFjYTg3MTc3YjcxMmQxN2RkNDVhOGJjMDJkYzUwMDZlYjY2MTc2NjlmMmQwZTNhZmE3MTljNTFmYzdjNzBjMQ=="
                    ></input>
                    <button class={style.button} type="submit">
                        Join the pack
                    </button>
                </form>
                <p>
                    Join an intellectual horror literature community and get access to high
                    quality writen stories and audiobooks based on real life places and events. Subscribe to updates and be
                    the first to know when its live.
                </p>
            </div>
        </div>
    );
};
//@ts-ignore
Home.title = "BlassWolf";

export default Home;
