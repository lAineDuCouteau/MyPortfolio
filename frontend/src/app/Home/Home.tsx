import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const greetings = ["Hello", "Hola", "Bonjour", "Ciao", "こんにちは", "안녕하세요", "مرحبا", "Olá", "Hallo", "Привет"];

const Home = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [velvetGalaxy, setVelvetGalaxy] = useState(false);
  const [heartFlying, setHeartFlying] = useState(false);
  const heartRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = () => {
  setHeartFlying(true);

  setTimeout(() => {
    setVelvetGalaxy((prev) => !prev); // toggle on/off
    setHeartFlying(false); // stop fly & zoom
  }, 2000); // duration of fly & zoom
};


  return (
<div className={styles.home}>
  {/* Velvet galaxy overlay */}
  <div className={`${styles.velvetOverlay} ${velvetGalaxy ? styles.active : ""}`}></div>
  
        <header className={styles.header}>
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

        <Link to="/globe">
          <button className={styles.ctaButton}>˙⋆🌟⋆˙</button>
        </Link>
      </header>

      <footer className={styles.footer}>
        <p>
          Made with{" "}
          <span
            ref={heartRef}
            className={`${styles.heart} ${heartFlying ? styles.flyZoom : ""}`}
            onClick={handleHeartClick}
          >
            ❤️
          </span>{" "}
          and a little stardust
        </p>
      </footer>
    </div>
  );
};

export default Home;
