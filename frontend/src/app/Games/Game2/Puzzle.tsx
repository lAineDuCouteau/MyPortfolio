import React, { useState, useEffect } from "react";
import styles from "./Puzzle.module.scss";
import { useNavigate } from "react-router-dom";
import puzzleImage from "../../../assets/games/puzzle.png"; // Replace with your image

const GRID_SIZE = 3;
const TILE_SIZE = 120; // px

type Tile = number | null;

const PuzzleGame: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [reverse, setReverse] = useState(false);
    const navigate = useNavigate();

  // Initialize puzzle
  useEffect(() => {
    const initialTiles: Tile[] = Array.from(
      { length: GRID_SIZE * GRID_SIZE - 1 },
      (_, i) => i
    );
    initialTiles.push(null); // empty tile
    setTiles(shuffle(initialTiles));
  }, []);

  // Shuffle tiles
  const shuffle = (array: Tile[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Move tile
  const moveTile = (index: number) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [
      emptyIndex - 1, // left
      emptyIndex + 1, // right
      emptyIndex - GRID_SIZE, // up
      emptyIndex + GRID_SIZE, // down
    ];

    // Check adjacency and prevent wrapping
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

  // Get tile position in px
  const getTilePosition = (index: number) => {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    return { top: row * TILE_SIZE, left: col * TILE_SIZE };
  };

  // Check if solved
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
      setTimeout(() => {
        navigate(-1);
      }, 600);
    };

  return (
  <div className={styles.mainContainer}>
        <button className={styles.backButton} onClick={handleBack}>
        🎮↩
      </button>
      <div className={`${styles.container} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}>
            
      <h1>Puzzle Game</h1>
      <div
        className={styles.grid}
        style={{ width: GRID_SIZE * TILE_SIZE, height: GRID_SIZE * TILE_SIZE }}
      >
        {tiles.map((tile, index) => {
          if (tile === null) return null; // empty tile
          const row = Math.floor(tile / GRID_SIZE);
          const col = tile % GRID_SIZE;
          const { top, left } = getTilePosition(index);

          return (
            <div
              key={tile}
              className={styles.tile}
              onClick={() => moveTile(index)}
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
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