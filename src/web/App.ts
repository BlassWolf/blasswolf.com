import htm from "htm";
import { h, Component } from "preact";
const html = htm.bind(h);
export default class App extends Component {
    render() {
        return html`<h1>Hello,world!</h1>
            <p>Hey!</p>
            <button onClick=${() => alert("Hello")}>Greet</button>`;
    }
}
