import React, { useState, useEffect } from "react";
import styles from "./Hobbies.module.scss"; 
import { useNavigate } from "react-router-dom";



const Hobbies = () => {
  const hobbies = ["Singing", "Dancing", "Gaming"];

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
    <div className={styles.hobbiesContainer}>
         <button className={styles.backButton} onClick={handleBack}>
                🌐↩
              </button>
      <ul
        className={`${styles.hobbiesList} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}
      >
              <h2 className={styles.title}>My Hobbies</h2>

        {hobbies.map((hobby, index) => (
          <li key={index} className={styles.hobbyItem}>
            {hobby}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hobbies;
