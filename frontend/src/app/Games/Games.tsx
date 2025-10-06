import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Games.module.scss";

const Games: React.FC = () => {
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
      navigate(-1);
    }, 600);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        🌐↩
      </button>
      <div className={`${styles.gridContainer} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}>

      <h1 className={styles.title}>🎮 Game Selection</h1>

      <div className={`${styles.grid}`}
        >
        <div className={styles.card} onClick={() => navigate("/snake")}>
          <h2>🐍 Snake</h2>
          <p>Classic Snake Game</p>
        </div>

      </div>
      </div>

    </div>
  );
};

export default Games;
