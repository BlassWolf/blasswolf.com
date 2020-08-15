import React from "react";
import { css } from "@emotion/core";
import logo from "./assets/logo.svg";
import signature from "./assets/signature.svg";
import bg from "./assets/bg.mp4";

const Home = () => {
  return (
    <div css={style.home}>
      <img src={logo} alt="BlassWolf" css={style.logo} />
      <div css={style["video-wrapper"]}>
        <video css={style.video} src={bg} loop autoPlay muted playsInline />
      </div>
      <div css={style["accent-block"]}>
        <div css={style.content}>
          <header css={style.header}>Coming Soon</header>
          <h1 css={style.h1}>Read the next story first</h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Join an intellectual horror literature community and get access to
            high quality writen stories and audiobooks based on real life places
            and events. Subscribe to updates and be the first to know when its
            live.
          </p>
          <form
            css={style.form}
            action="https://app.mailjet.com/widget/iframe/5ItF/Euc"
            method="POST"
          >
            <input
              type="email"
              placeholder="Your email"
              css={style.input}
              name="w-field-field-155632-1006756-1362615-email"
            />
            <input
              type="hidden"
              id="csrf_token"
              name="csrf_token"
              value="NGFjYTg3MTc3YjcxMmQxN2RkNDVhOGJjMDJkYzUwMDZlYjY2MTc2NjlmMmQwZTNhZmE3MTljNTFmYzdjNzBjMQ=="
            ></input>
            <button css={style.button} type="submit">
              Join the pack
            </button>
          </form>
        </div>
      </div>
      <div css={style.content}>
        <h2 css={style.header}>Greetings</h2>

        <p>
          My name is Blass Wolf, and I am the person responsible for this
          website and its content. many of you reached out to me on social media
          looking for answers as to what exactly this website is about and what
          kind of content it will feature, first and foremost I would like to
          say that social media isn't the ideal place to reach me, the best and
          only way to do so is through this website, which soon will feature a
          way in which you can contact me directly, expressing your doubts,
          suggestion and whatever else you might have in mind regarding this
          project and how you can interact with it, as well as learn how you can
          help shape the future of our publications and tools.
        </p>

        <p>
          As for the first question: this website is a space to read and discuss
          horror stories of my authorship, and also the real-life events and
          places that inspired those stories, delving deep into personal
          beliefs, occultism, parapsychology, regional legends, folklore,
          unexplained phenomena, personal experiences and everything else under
          the definition of paranormal and ultimately supernatural.
        </p>

        <p>
          The content that will be featured consists, as mentioned above, of
          horror stories and stories focused on eerie corners and events of our
          world, as well as the theory behind such occurrences, being it natural
          causes, paranormal or supernatural, the website will also feature a
          section where members will be able to interact with each other and
          discuss their theories, beliefs, experiences, etc...
        </p>

        <p>
          As for now, you can subscribe to the website newsletter and be
          informed as soon as the first publication is available.
        </p>

        <p>thank you for your interest and welcome to the pack -</p>

        <p css={style.signature}>
          B.Wolf
          <img
            src={signature}
            alt="Signature: Blass Wolf"
            style={{
              marginLeft: "1rem",
            }}
          />
        </p>
      </div>
    </div>
  );
};

const style = {
  video: css`
    width: 100%;
    object-fit: cover;
    box-sizing: border-box;
    z-index: 0;
    min-height: 456px;
    max-height: 792px;
  `,
  "video-wrapper": css`
    position: relative;

    &::after {
      content: "";
      display: block;
      background: linear-gradient(
        179.71deg,
        rgba(0, 0, 0, 0) 89.46%,
        #000000 100%
      );
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  `,
  logo: css`
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 60px;
    transform: translateX(-50%);
    max-width: 80%;
    max-height: 250px;
  `,
  home: css`
    width: 100%;
    min-height: 100%;
    padding-bottom: 4rem;
  `,
  content: css`
    display: flex;
    flex-direction: column;
    max-width: 576px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.75);
    padding: 0 16px;
  `,
  header: css`
    font-size: 32px;
    line-height: 48px;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    margin: 0;
    font-weight: normal;
  `,
  h1: css`
    font-size: 32px;
    line-height: 48px;
    margin: 0;
    font-weight: bold;
    text-align: center;
    color: white;
  `,

  form: css`
    display: flex;
    flex-direction: column;
    margin: 16px auto 48px;
    width: max-content;
    max-width: 100%;

    @media (min-width: 600px) {
      flex-direction: row;
    }
  `,

  input: css`
    border: 1px solid rgba(255, 255, 255, 0.08);
    background-color: rgba(255, 255, 255, 0.04);
    line-height: 48px;

    height: 60px;
    padding: 6px 16px;
    border-bottom-width: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 0;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 0;
    color: white;
    font-size: 24px;
    outline: none;
    box-shadow: none;
    transition: 300ms ease;
    text-align: center;

    @media (min-width: 600px) {
      border-right-width: 0;
      border-bottom-width: 1px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      text-align: left;
      min-width: 350px;
    }
    &:focus {
      outline: none;
      box-shadow: none;
      background-color: rgba(255, 255, 255, 0.08);
      transition: 300ms ease;
    }
  `,
  button: css`
    padding: 6px 32px;
    background-color: #942e39;
    font-weight: bold;
    border: none;
    color: white;
    line-height: 48px;
    height: 60px;
    font-size: 20px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 8px;
    cursor: pointer;
    transition: 300ms ease;

    &:hover {
      outline: none;
      box-shadow: none;
      background-color: #a63446;
      transition: 300ms ease;
    }

    @media (min-width: 600px) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  `,
  "accent-block": css`
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.08)
    );
    margin-bottom: 2rem;
  `,

  signature: css`
    display: flex;
    align-items: center;
  `,
};

export default Home;
