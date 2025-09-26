import { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const greetings = [
  "Hello",        // English
  "Hola",         // Spanish
  "Bonjour",      // French
  "Ciao",         // Italian
  "こんにちは",     // Japanese
  "안녕하세요",      // Korean
  "مرحبا",        // Arabic
  "Olá",          // Portuguese
  "Hallo",        // German
  "Привет",       // Russian
];

const Home = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        {/* Greeting in fixed-height container */}
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
        <p>Made with ❤️ and a little stardust</p>
      </footer>
    </div>
  );
};

export default Home;
