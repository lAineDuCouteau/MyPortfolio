import React, { useState, useEffect } from "react";
import styles from "./Puzzle.module.scss";
import { useNavigate } from "react-router-dom";
import puzzleImage from "../../../assets/games/puzzle.png";

const GRID_SIZE = 3;

type Tile = number | null;

const PuzzleGame: React.FC = () => {
  const [tileSize, setTileSize] = useState(120);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [reverse, setReverse] = useState(false);
  const navigate = useNavigate();

  // Dynamically set tile size based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) setTileSize(80);
      else if (window.innerWidth < 600) setTileSize(100);
      else setTileSize(120);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initialTiles: Tile[] = Array.from(
      { length: GRID_SIZE * GRID_SIZE - 1 },
      (_, i) => i
    );
    initialTiles.push(null);
    setTiles(shuffle(initialTiles));
  }, []);

  const shuffle = (array: Tile[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const moveTile = (index: number) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - GRID_SIZE,
      emptyIndex + GRID_SIZE,
    ];
    if (validMoves.includes(index)) {
      if (
        (emptyIndex % GRID_SIZE === 0 && index === emptyIndex - 1) ||
        (emptyIndex % GRID_SIZE === GRID_SIZE - 1 && index === emptyIndex + 1)
      )
        return;
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
      setMoves((m) => m + 1);
    }
  };

  const getTilePosition = (index: number) => {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    return { top: row * tileSize, left: col * tileSize };
  };

  const isSolved = () => {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] !== i) return false;
    }
    return true;
  };

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

      <div
        className={`${styles.container} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}
      >
        <h1>Puzzle Game</h1>

        <div
          className={styles.grid}
          style={{
            width: GRID_SIZE * tileSize,
            height: GRID_SIZE * tileSize,
          }}
        >
          {tiles.map((tile, index) => {
            if (tile === null) return null;
            const row = Math.floor(tile / GRID_SIZE);
            const col = tile % GRID_SIZE;
            const { top, left } = getTilePosition(index);

            return (
              <div
                key={tile}
                className={styles.tile}
                onClick={() => moveTile(index)}
                style={{
                  width: tileSize,
                  height: tileSize,
                  top,
                  left,
                  backgroundImage: `url(${puzzleImage})`,
                  backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                  backgroundPosition: `${(col * 100) / (GRID_SIZE - 1)}% ${
                    (row * 100) / (GRID_SIZE - 1)
                  }%`,
                }}
              />
            );
          })}
        </div>

        <p>Moves: {moves}</p>
        {isSolved() && <p className={styles.solved}>🎉 Puzzle Solved! 🎉</p>}
        <button onClick={() => setTiles(shuffle(tiles))}>Shuffle</button>
      </div>
    </div>
  );
};

export default PuzzleGame;
