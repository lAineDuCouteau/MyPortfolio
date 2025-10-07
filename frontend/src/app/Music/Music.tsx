import React, { useState, useEffect } from "react";
import sound1 from "../../assets/mp3/sound1.mp3";
import sound2 from "../../assets/mp3/sound2.mp3";
import sound3 from "../../assets/mp3/sound3.mp3";
import cover1 from "../../assets/mp3/cover1.png";
import cover2 from "../../assets/mp3/cover2.png";
import cover3 from "../../assets/mp3/cover3.png";
import styles from "./Music.module.scss";
import { useNavigate } from "react-router-dom";

type MusicProps = {
  setCurrentMusic: React.Dispatch<React.SetStateAction<string>>;
  currentTrack: string;
  isPlaying: boolean;
  togglePlayPause: () => void;
};

const Music: React.FC<MusicProps> = ({
  setCurrentMusic,
  currentTrack,
  isPlaying,
  togglePlayPause,
}) => {
  const [animate, setAnimate] = useState(false);
  const [reverse, setReverse] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedTrack = localStorage.getItem("currentTrack");
    if (savedTrack) setCurrentMusic(savedTrack);
  }, [setCurrentMusic]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setReverse(true);
    setTimeout(() => {
    navigate("/globe");
    }, 600);
  };

  const handlePlay = (albumSrc: string) => {
    if (albumSrc === currentTrack) {
      // ✅ Same song → toggle play/pause
      togglePlayPause();
    } else {
      // ✅ New song → switch track and start playing
      setCurrentMusic(albumSrc);
      localStorage.setItem("currentTrack", albumSrc);
    }
  };



  const albums = [
    { title: "Chill Vibes", src: sound1, cover: cover1 },
    { title: "Calm Music", src: sound2, cover: cover2 },
    { title: "Galaxy Sounds", src: sound3, cover: cover3 },
  ];

  return (
    <div className={`${styles.musicContainer} ${reverse ? styles.reverse : ""}`}>
      <button className={styles.backButton} onClick={handleBack}>
        🌐↩
      </button>

      <h1 className={styles.musicTitle}>Change Background Music</h1>

      <div
        className={`${styles.albumGrid} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}
      >
        {albums.map((album, idx) => (
          <div
            key={idx}
            className={`${styles.albumCard} ${
              currentTrack === album.src ? styles.activeCard : ""
            }`}
          >
            <div className={styles.albumImageWrapper}>
              <img
                src={album.cover}
                alt={album.title}
                className={styles.albumCover}
              />
              <button
                className={`${styles.playButton} ${
                  currentTrack === album.src ? styles.activePlay : ""
                }`}
                onClick={() => handlePlay(album.src)}
              >
                {currentTrack === album.src && isPlaying ? "⏸" : "▶"}
              </button>
            </div>
            <p
              className={`${styles.albumTitle} ${
                currentTrack === album.src ? styles.activeTitle : ""
              }`}
            >
              {album.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
