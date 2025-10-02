import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./Projects.module.scss";

const projects = [
  {
    name: "DiscoverU",
    description: "A system for CvSU Students of Bacoor City Campus.",
    url: "https://student-taupe-two.vercel.app",
    image: null,
  },
  {
    name: "Launchpad Reservation",
    description: "My personal portfolio showcasing skills and projects.",
    url: "https://res-v.vercel.app",
    image: null,
  },
  {
    name: "Valkyrie",
    description: "Another project deployed on Vercel.",
    url: "https://your-other-project.vercel.app",
    image: null,
  },
  
  
];

const Projects = () => {
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
      navigate(-1); // go back after animation
    }, 600); // match your animation duration
  };

  return (
    <div className={`${styles.projectsPage} ${reverse ? styles.reverse : ""}`}>
      <button className={styles.backButton} onClick={handleBack}>
        🌐↩
      </button>

<div
        className={`${styles.projectsGrid} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}
      >        {projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <div className={styles.cardImage}>
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                project.name
              )}
            </div>
            <div className={styles.cardContent}>
              <p>{project.description}</p>
            </div>
            <div className={styles.cardActions}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                Visit Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
