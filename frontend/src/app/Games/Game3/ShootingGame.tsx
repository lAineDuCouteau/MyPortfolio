import React, { useState, useEffect, useRef } from "react";
import styles from "./ShootingGame.module.scss";
import jetImg from "../../../assets/games/jet.png";
import alienImg from "../../../assets/games/alien.png";
import { useNavigate } from "react-router-dom";

interface Bullet {
  x: number;
  y: number;
  trail: number[];
}

interface Enemy {
  x: number;
  y: number;
  type: "fast" | "slow";
}

interface Explosion {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

const canvasWidth = 500;
const canvasHeight = 600;

const ShootingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const jetImgRef = useRef<HTMLImageElement>(new Image());
  const enemyImgRef = useRef<HTMLImageElement>(new Image());

  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const explosionsRef = useRef<Explosion[]>([]);
  const jetXRef = useRef<number>(canvasWidth / 2 - 25);
  const scoreRef = useRef<number>(0);

  const [gameOver, setGameOver] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [, setRender] = useState(0); // force render for score
  const navigate = useNavigate();

  // Load images once
  useEffect(() => {
    jetImgRef.current.src = jetImg;
    enemyImgRef.current.src = alienImg;
  }, []);

  // Spawn enemies
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (!gameOver) {
        const type = Math.random() < 0.5 ? "fast" : "slow";
        enemiesRef.current.push({
          x: Math.random() * (canvasWidth - 40),
          y: 0,
          type,
        });
      }
    }, 1200);
    return () => clearInterval(spawnInterval);
  }, [gameOver]);

  // Game loop
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw jet
      ctx.drawImage(jetImgRef.current, jetXRef.current, canvasHeight - 80, 50, 50);

      // Move bullets
      bulletsRef.current = bulletsRef.current
        .map((b) => ({ x: b.x, y: b.y - 8, trail: [b.y, ...b.trail].slice(0, 5) }))
        .filter((b) => b.y > 0);

      // Draw bullets
      bulletsRef.current.forEach((b) => {
        b.trail.forEach((ty, i) => {
          ctx.fillStyle = `rgba(0,255,255,${0.2 - i * 0.03})`;
          ctx.fillRect(b.x + 22, ty, 6, 12);
        });
        ctx.fillStyle = "#0ff";
        ctx.fillRect(b.x + 22, b.y, 6, 12);
      });

      // Move enemies
      enemiesRef.current = enemiesRef.current
        .map((e) => ({ ...e, y: e.y + (e.type === "fast" ? 1 : 0.5) }))
        .filter((e) => e.y < canvasHeight);

      // Draw enemies
      enemiesRef.current.forEach((e) => {
        ctx.save();
        ctx.shadowColor = e.type === "fast" ? "#ff3ca6" : "#0ff";
        ctx.shadowBlur = 10;
        ctx.drawImage(enemyImgRef.current, e.x, e.y, 40, 40);
        ctx.restore();
      });

      // Bullet-Enemy collision
      bulletsRef.current.forEach((b, bi) => {
        enemiesRef.current.forEach((e, ei) => {
          if (
            b.x + 6 > e.x - 5 &&
            b.x < e.x - 5 + 50 &&
            b.y + 12 > e.y - 5 &&
            b.y < e.y - 5 + 50
          ) {
            explosionsRef.current.push({ x: e.x + 20, y: e.y + 20, radius: 0, alpha: 1 });
            bulletsRef.current.splice(bi, 1);
            enemiesRef.current.splice(ei, 1);
            scoreRef.current += e.type === "fast" ? 2 : 1;
            setRender((r) => r + 1);
          }
        });
      });

      // Jet-Enemy collision (Game Over)
      enemiesRef.current.forEach((e) => {
        const jetWidth = 50;
        const jetHeight = 50;
        const enemyWidth = 40;
        const enemyHeight = 40;

        if (
          jetXRef.current < e.x + enemyWidth &&
          jetXRef.current + jetWidth > e.x &&
          canvasHeight - 80 < e.y + enemyHeight &&
          canvasHeight - 80 + jetHeight > e.y
        ) {
          setGameOver(true);
        }
      });

      // Draw explosions
      explosionsRef.current = explosionsRef.current
        .map((exp) => ({ ...exp, radius: exp.radius + 2, alpha: exp.alpha - 0.05 }))
        .filter((exp) => exp.alpha > 0);

      explosionsRef.current.forEach((exp) => {
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${exp.alpha})`;
        ctx.fill();
      });

      // Draw score
      ctx.fillStyle = "#ff3ca6";
      ctx.font = "20px Orbitron";
      ctx.fillText(`Score: ${scoreRef.current}`, 40, 30);

      // Game Over text
      if (gameOver) {
        ctx.fillStyle = "#ff3ca6";
        ctx.font = "40px Orbitron";
        ctx.textAlign = "center";
        ctx.fillText("💀 GAME OVER 💀", canvasWidth / 2, canvasHeight / 2);
      }

      if (!gameOver) requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [gameOver]);

  // Controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!gameOver) {
        if (e.key === "ArrowLeft") jetXRef.current = Math.max(0, jetXRef.current - 20);
        if (e.key === "ArrowRight") jetXRef.current = Math.min(canvasWidth - 50, jetXRef.current + 20);
        if (e.key === " ") bulletsRef.current.push({ x: jetXRef.current, y: canvasHeight - 80, trail: [] });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOver]);

  // Animations
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setReverse(true);
    setTimeout(() => navigate(-1), 600);
  };

  return (
    <div className={styles.mainContainer}>
      <button className={styles.backButton} onClick={handleBack}>
        🎮↩
      </button>
      <div className={`${styles.container} ${animate && !reverse ? styles.zoomInOut : ""} ${reverse ? styles.zoomInFade : ""}`}>
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        <p className={styles.controls}>Use ← → to move, Space to shoot!</p>

        {/* 🔹 Mobile Controls */}
<div className={styles.mobileControls}>
  <div className={styles.arrowRow}>
    <button onClick={() => (jetXRef.current = Math.max(0, jetXRef.current - 20))}>⬅</button>
    <button onClick={() => bulletsRef.current.push({ x: jetXRef.current, y: canvasHeight - 80, trail: [] })}>🔥</button>
    <button onClick={() => (jetXRef.current = Math.min(canvasWidth - 50, jetXRef.current + 20))}>➡</button>
  </div>
</div>

        {gameOver && (
          <button
            className={styles.restartButton}
            onClick={() => {
              enemiesRef.current = [];
              bulletsRef.current = [];
              explosionsRef.current = [];
              jetXRef.current = canvasWidth / 2 - 25;
              scoreRef.current = 0;
              setGameOver(false);
              setRender((r) => r + 1);
            }}
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
};

export default ShootingGame;
