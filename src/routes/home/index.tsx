import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import logo from "./logo.svg";
import bg from "./bg.mp4";
const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <img src={logo} alt="BlassWolf" class={style.logo} />
            <video class={style.video} src={bg} loop autoPlay muted />
        </div>
    );
};
//@ts-ignore
Home.title = "BlassWolf";

export default Home;
