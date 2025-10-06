import React, { useState, useEffect, useRef } from "react";
import styles from "./ShootingGame.module.scss";
import jetImg from "../../../assets/games/jet.png";     // Your jet image
import alienImg from "../../../assets/games/alien.png"; // Your enemy image

interface Bullet {
  x: number;
  y: number;
}

interface Enemy {
  x: number;
  y: number;
}

const ShootingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [jetX, setJetX] = useState(250);
  const [score, setScore] = useState(0);

  const canvasWidth = 500;
  const canvasHeight = 600;

  // Spawn enemies
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prev) => [...prev, { x: Math.random() * (canvasWidth - 50), y: 0 }]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Game loop
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    let animationId: number;

    const gameLoop = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw jet
      const jetImgEl = new Image();
      jetImgEl.src = jetImg;
      ctx.drawImage(jetImgEl, jetX, canvasHeight - 80, 50, 50);

      // Move and draw bullets
      const newBullets = bullets.map((b) => ({ x: b.x, y: b.y - 5 }));
      setBullets(newBullets.filter((b) => b.y > 0));

      ctx.fillStyle = "#0ff";
      newBullets.forEach((b) => ctx.fillRect(b.x + 22, b.y, 6, 12));

      // Move and draw enemies
      const newEnemies = enemies.map((e) => ({ x: e.x, y: e.y + 2 }));
      setEnemies(newEnemies.filter((e) => e.y < canvasHeight));

      const enemyImgEl = new Image();
      enemyImgEl.src = alienImg;
      newEnemies.forEach((e) => ctx.drawImage(enemyImgEl, e.x, e.y, 40, 40));

      // Collision detection
      newEnemies.forEach((enemy, i) => {
        newBullets.forEach((bullet, j) => {
          if (
            bullet.x < enemy.x + 40 &&
            bullet.x + 6 > enemy.x &&
            bullet.y < enemy.y + 40 &&
            bullet.y + 12 > enemy.y
          ) {
            setEnemies((prev) => prev.filter((_, idx) => idx !== i));
            setBullets((prev) => prev.filter((_, idx) => idx !== j));
            setScore((s) => s + 1);
          }
        });
      });

      // Draw score
      ctx.fillStyle = "#ff3ca6";
      ctx.font = "20px Orbitron";
      ctx.fillText(`Score: ${score}`, 10, 30);

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();
    return () => cancelAnimationFrame(animationId);
  }, [bullets, enemies, jetX, score]);

  // Handle controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setJetX((x) => Math.max(0, x - 20));
      if (e.key === "ArrowRight") setJetX((x) => Math.min(canvasWidth - 50, x + 20));
      if (e.key === " ") {
        setBullets((prev) => [...prev, { x: jetX, y: canvasHeight - 80 }]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [jetX]);

  return (
    <div className={styles.mainContainer}>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      <p className={styles.controls}>Use ← → to move, Space to shoot!</p>
    </div>
  );
};

export default ShootingGame;
