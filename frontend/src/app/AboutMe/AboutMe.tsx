import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for routing
import styles from "./AboutMe.module.scss";
import profilePic from "../../assets/profile.png";

const AboutMe = () => {
  const [animate, setAnimate] = useState(false);
  const [reverse, setReverse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setReverse(true);
    setTimeout(() => {
      navigate(-1); // go back after animation
    }, 600); // match your animation duration
  };

  return (
    <section className={styles.about}>
      <div
        className={`${styles.content} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}
      >
        <div className={styles.text}>
          <h2>
            Hello! I'm <span>Kelly S. Soberano</span>
          </h2>
          <p>
            ✨ I'm <strong>25 years old</strong>, a passionate developer and
            problem solver.
          </p>
          <p>
            ✨ Graduated from{" "}
            <strong>Cavite State University - Bacoor City Campus</strong>.
          </p>
          <p>
            ✨ I love tackling logic puzzles, diving into mathematical
            challenges, and learning new algorithms.
          </p>
          <p>
            ✨ When I'm coding, I can't stop until I attain the goal in my
            creative mind and be satisfied of the outcome.
          </p>
          <p>✨ Fun fact: I enjoy being competetive in every thing I do.</p>
          <p>
            ✨ My goal is to combine creativity and logic to build solutions that
            are not only functional but also visually stunning.
          </p>
          <button className={styles.backButton} onClick={handleBack}>
            ⬅ Back
          </button>
        </div>
        <div className={styles.image}>
          <img src={profilePic} alt="Kelly S. Soberano" />
        </div>
      </div>

      <div className={styles.fadeOverlay} />
    </section>
  );
};

export default AboutMe;
