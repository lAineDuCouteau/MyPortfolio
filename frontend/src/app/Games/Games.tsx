import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Games.module.scss";
import snakeImg from "../../assets/games/snake.png";
import puzzleImg from "../../assets/games/puzzlebg.png";


const Games: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [angle, setAngle] = useState(0);
  const navigate = useNavigate();

  const requestRef = useRef<number | null>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const games = [
  { name: "Snake", path: "/snake", img: snakeImg, icon: "🐍", desc: "Classic Snake Game" },
  { name: "Puzzle", path: "/puzzle", img: puzzleImg, icon: "🧩", desc: "Star Puzzle Game" },
  { name: "Shooting Game", path: "/shooting", img: snakeImg, icon: "👾", desc: "Shooting Game" },
  { name: "Pac-Man", path: "/pacman", img: snakeImg, icon: "👾", desc: "Eat the dots, avoid ghosts!" },
  { name: "Space Invaders", path: "/space", img: snakeImg, icon: "🚀", desc: "Defend against alien invasion" },
];

  // Auto rotation
  useEffect(() => {
    const rotate = () => {
      if (!dragging.current) {
        setAngle((prev) => prev - .1); // slow auto spin
      }
      requestRef.current = requestAnimationFrame(rotate);
    };
    requestRef.current = requestAnimationFrame(rotate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

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

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) {
      const deltaX = e.clientX - lastX.current;
      setAngle((prev) => prev + deltaX * 0.5); // adjust sensitivity
      lastX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    lastX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragging.current) {
      const deltaX = e.touches[0].clientX - lastX.current;
      setAngle((prev) => prev + deltaX * 0.5);
      lastX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    dragging.current = false;
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        🌐↩
      </button>

      <div
        className={`${styles.gridContainer} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}
      >
        <h1 className={styles.title}>🎮 Game Selection</h1>

        <div
          className={styles.carouselWrapper}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.carousel} style={{ transform: `translateZ(-400px) rotateY(${angle}deg)` }}>
  {games.map((game, index) => {
    const rotation = (360 / games.length) * index; // auto-angle
    return (
      <div
        key={game.name}
        className={styles.card}
        style={{ transform: `rotateY(${rotation}deg) translateZ(400px)` }}
        onClick={() => navigate(game.path)}
      >
        <img src={game.img} alt={game.name} className={styles.cardImage} />
        <h2>{game.icon} {game.name}</h2>
        <p>{game.desc}</p>
      </div>
    );
  })}
</div>
        </div>
      </div>
    </div>
  );
};

export default Games;
