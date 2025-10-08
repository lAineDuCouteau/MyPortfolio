import React, { useEffect, useState } from "react";
import styles from "./GameLoading.module.scss";

const GameLoading: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        const increment = Math.ceil((100 - prev) / 10); // smaller steps near the end
        return Math.min(prev + increment, 100);
      });
    }, 50); // adjust speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.stars}></div>
      <div className={styles.particles}></div>

      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <div className={styles.loadingBar}>
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{`Loading Game... ${progress > 100 ? 100 : progress}%`}</p>
      </div>
    </div>
  );
};

export default GameLoading;
