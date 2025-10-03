import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./app/Home/Home";
import AboutMe from "./app/AboutMe/AboutMe";
import Globe from "./app/Globe/Globe";
import Header from "./app/Header/Header";
import Contacts from "./app/Contacts/Contacts";
import Projects from "./app/Projects/Projects";
import Music from "./app/Music/Music";
import './App.css';
import sound1 from "./assets/mp3/sound1.mp3";

const AppWrapper = () => {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  // ✅ Initialize state from localStorage
  const [currentMusic, setCurrentMusic] = useState<string>(
    localStorage.getItem("currentTrack") || sound1
  );
  const [isMuted, setIsMuted] = useState<boolean>(
    localStorage.getItem("musicMuted") === "false" ? false : true
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(!isMuted);

  // ✅ Restore playback time
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) audio.currentTime = parseFloat(savedTime);

    audio.src = currentMusic;
    audio.muted = isMuted;

    if (!isMuted) {
      audio.play().catch(() => console.log("Autoplay blocked 👆"));
      setIsPlaying(true);
    }
  }, [currentMusic, isMuted]);

  // ✅ Save current track & mute state
  useEffect(() => {
    localStorage.setItem("currentTrack", currentMusic);
  }, [currentMusic]);

  useEffect(() => {
    localStorage.setItem("musicMuted", isMuted.toString());
  }, [isMuted]);

  // ✅ Save current playback position every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        localStorage.setItem(
          "musicTime",
          audioRef.current.currentTime.toString()
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Play/Pause toggle
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // ✅ Unmute on user action
  const unmuteAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = false;
    audioRef.current.play();
    setIsMuted(false);
    setIsPlaying(true);
  };

  return (
    <div className="App">
      {/* Persistent audio element */}
      <audio ref={audioRef} loop />

      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<Home unmuteAudio={unmuteAudio} />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/globe" element={<Globe />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/music"
          element={
            <Music
              setCurrentMusic={setCurrentMusic}
              currentTrack={currentMusic}
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
