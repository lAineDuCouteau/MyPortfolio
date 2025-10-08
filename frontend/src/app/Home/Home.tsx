import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

const greetings = ["Hello", "Hola", "Bonjour", "Ciao", "こんにちは", "안녕하세요", "مرحبا", "Olá", "Hallo", "Привет"];

type HomeProps = {
  unmuteAudio: () => void;
};

const Home: React.FC<HomeProps> = ({ unmuteAudio }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [velvetGalaxy, setVelvetGalaxy] = useState(false);
  const [heartFlying, setHeartFlying] = useState(false);
  const [twinkling, setTwinkling] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [introActive, setIntroActive] = useState(true);
  const heartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Trigger intro animation once when page loads
  useEffect(() => {
    const introTimer = setTimeout(() => setIntroActive(false), 3000);
    return () => clearTimeout(introTimer);
  }, []);

  const handleHeartClick = () => {
    setHeartFlying(true);
    setTimeout(() => {
      setVelvetGalaxy((prev) => !prev);
      setHeartFlying(false);
    }, 2000);
  };

  const handleStar = () => {
    unmuteAudio();
    setTwinkling(true);
    setFadeOut(true); // start cosmic fade
    setTimeout(() => {
      navigate("/globe");
    }, 3400);
  };

  return (
    <div
      className={`${styles.home} ${fadeOut ? styles.cosmicFade : ""} ${
        introActive ? styles.intro : ""
      }`}
    >
      <div className={`${styles.velvetOverlay} ${velvetGalaxy ? styles.active : ""}`}></div>

      <header
        className={`${styles.header} ${
          fadeOut ? styles.textFade : introActive ? styles.textIntro : ""
        }`}
      >
        <div className={styles.greetingContainer}>
          <div className={styles.greeting}>{greetings[greetingIndex]}!</div>
        </div>

        <h1>Welcome to My Portfolio</h1>
        <p>
          Programming is like planting ideas into a machine. Nurture them with
          logic and patience, and they grow into solutions.
        </p>

        <p className={styles.subText}>
          Explore my projects, discover my journey, and see the universe of
          code I’ve created.
        </p>

        <button
          className={`${styles.ctaButton} ${twinkling ? styles.twinkle : ""}`}
          onClick={handleStar}
          disabled={twinkling}
        >
          ˙⋆🌟⋆˙
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className={styles.sparkle}></span>
          ))}
        </button>
      </header>

      <footer
        className={`${styles.footer} ${
          fadeOut ? styles.textFade : introActive ? styles.textIntroFooter : ""
        }`}
      >
        <p>
          Made with{" "}
          <span
            ref={heartRef}
            className={`${styles.heart} ${heartFlying ? styles.flyZoom : ""}`}
            onClick={handleHeartClick}
          >
            ❤️
          </span>{" "}
          and a little stardust. 
          
        </p>
      </footer>
    </div>
  );
};

export default Home;
