import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import logo from "./logo.svg";
import signature from "./signature.svg";
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
      <div
        class={style["accent-block"]}
      >
        <div class={style.content}>
          <header class={style.header}>Coming Soon</header>
          <h1 class={style.h1}>Read the next story first</h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Join an intellectual horror literature community and get access to high
            quality writen stories and audiobooks based on real life places and events. Subscribe to updates and be
            the first to know when its live.
          </p>
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
            >
            </input>
            <button class={style.button} type="submit">
              Join the pack
            </button>
          </form>
        </div>
      </div>
      <div class={style.content}>
        <h2 class={style.header}>Greetings</h2>

        <p>
          My name is Blass Wolf, and I am the person responsible for this website and its content.
          many of you reached out to me on social media looking for answers as to what exactly this website is about and what kind of content it will feature, first and foremost I would like to say that social media isn't the ideal place to reach me, the best and only way to do so is through this website, which soon will feature a way in which you can contact me directly, expressing your doubts, suggestion and whatever else you might have in mind regarding this project and how you can interact with it, as well as learn how you can help shape the future of our publications and tools.
        </p>

        <p>
          As for the first question: this website is a space to read and discuss horror stories of my authorship, and also the real-life events and places that inspired those stories, delving deep into personal beliefs, occultism, parapsychology, regional legends, folklore, unexplained phenomena, personal experiences and everything else under the definition of paranormal and ultimately supernatural.
        </p>

        <p>
          The content that will be feature consists, as mentioned above, of horror stories and stories focused on eerie corners and events of our world, as well as the theory behind such occurrences, being it natural causes, paranormal or supernatural, the website will also feature a section where members will be able to interact with each other and discuss their theories, beliefs, experiences, etc...
        </p>

        <p>
          As for now, you can subscribe to the website newsletter and be informed as soon as the first publication is available.
        </p>

        <p>thank you for your interest and welcome to the pack -</p>

        <p class={style.signature}>
          B.Wolf
          <img src={signature} alt="Signature: Blass Wolf" style={{
            marginLeft: "1rem",
          }} />
        </p>
      </div>
    </div>
  );
};
//@ts-ignore
Home.title = "BlassWolf";

export default Home;
