import React, { useState, useEffect } from "react";
import styles from "./Hobbies.module.scss"; 
import { useNavigate } from "react-router-dom";

// Example images (replace with your own paths/assets)
import singingImg from "../../assets/hobbies/sing.png";
import dancingImg from "../../assets/hobbies/dance.png";
import gamingImg from "../../assets/hobbies/game.png";

const Hobbies = () => {
  const hobbies = [
    {
      title: "Singing",
      description: "Expressing emotions through melodies and harmonies is my way of storytelling. Music is my escape and my voice is my instrument.",
      image: singingImg,
    },
    {
      title: "Dancing",
      description: "Dancing lets me connect with rhythm and movement. It’s a joyful way to stay active, creative, and free.",
      image: dancingImg,
    },
    {
      title: "Gaming",
      description: "Gaming allows me to explore new worlds, challenge my skills, and connect with people from across the globe.",
      image: gamingImg,
    },
  ];

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

  const handleGames = () => {
  setReverse(true);
  setTimeout(() => {
    navigate("/games");
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
        {hobbies.map((hobby, index) => (
          <li key={index} className={styles.hobbyCard}>
            {/* ⭐ Only show star on Gaming card */}
            {hobby.title === "Gaming" && (
              <button 
                className={styles.starButton} 
                onClick={handleGames}
              >
                ⭐
              </button>
            )}
            <img src={hobby.image} alt={hobby.title} className={styles.hobbyImage} />
            <div className={styles.hobbyContent}>
              <h3 className={styles.hobbyTitle}>{hobby.title}</h3>
              <p className={styles.hobbyDescription}>{hobby.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hobbies;
