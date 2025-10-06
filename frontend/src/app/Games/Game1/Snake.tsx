import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Snake.module.scss";

interface Position {
  x: number;
  y: number;
}

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 100, y: 100 }]);
  const [food, setFood] = useState<Position>({ x: 200, y: 200 });
  const [dir, setDir] = useState<Position>({ x: 20, y: 0 });
  const [score, setScore] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [animate, setAnimate] = useState(false);
  const [reverse, setReverse] = useState(false);
  const navigate = useNavigate();

  const cellSize = 20;
  const width = 800;
  const height = 600;

  // Draw game elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#000000");
    gradient.addColorStop(1, "#111133");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw snake
    ctx.fillStyle = "#00FF66";
    snake.forEach((seg, i) => {
      ctx.beginPath();
      ctx.roundRect(seg.x, seg.y, cellSize, cellSize, 5);
      ctx.fill();
      // Add darker green for snake head
      if (i === 0) {
        ctx.fillStyle = "#00CC44";
        ctx.fill();
        ctx.fillStyle = "#00FF66";
      }
    });

    // Draw food (glowing red)
    ctx.shadowColor = "red";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + cellSize / 2, food.y + cellSize / 2, cellSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [snake, food, score]);

  // Game loop
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      const head: Position = {
        x: (snake[0].x + dir.x + width) % width,
        y: (snake[0].y + dir.y + height) % height,
      };

      const newSnake = [head, ...snake];

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 1);
        setFood({
          x: Math.floor(Math.random() * (width / cellSize)) * cellSize,
          y: Math.floor(Math.random() * (height / cellSize)) * cellSize,
        });
      } else {
        newSnake.pop();
      }

      // Collision with itself
      if (newSnake.slice(1).some((seg) => seg.x === head.x && seg.y === head.y)) {
        setRunning(false);
        setGameOver(true);
        return;
      }

      setSnake(newSnake);
    }, 50);

    return () => clearInterval(interval);
  }, [snake, dir, running]);

  // Controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && dir.y === 0) setDir({ x: 0, y: -cellSize });
      if (e.key === "ArrowDown" && dir.y === 0) setDir({ x: 0, y: cellSize });
      if (e.key === "ArrowLeft" && dir.x === 0) setDir({ x: -cellSize, y: 0 });
      if (e.key === "ArrowRight" && dir.x === 0) setDir({ x: cellSize, y: 0 });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dir]);

  const restartGame = () => {
    setSnake([{ x: 100, y: 100 }]);
    setDir({ x: 20, y: 0 });
    setScore(0);
    setRunning(true);
    setGameOver(false);
  };

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
    <div className={styles.gameWrapper}>
      <button className={styles.backButton} onClick={handleBack}>
        🎮↩
      </button>
      <div className={`${styles.container} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}>
      <h1 className={styles.title}>🐍 Snake Game</h1>
      <div className={styles.score}>Score: {score}</div>

      <canvas ref={canvasRef} width={width} height={height} className={styles.canvas} />

      {gameOver && (
  <div className={styles.overlay}>
    <h2 className={styles.gameOver}>Game Over</h2>
    <p className={styles.finalScore}>Final Score: {score}</p>
    <button className={styles.restartButton} onClick={restartGame}>
      🔄 Restart
    </button>
  </div>
)}
    </div>
    </div>
  );
};

export default SnakeGame;
