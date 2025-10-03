import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./Projects.module.scss";
import discoverU from "../../assets/discoverU/student.png"; 
import discoverU1 from "../../assets/discoverU/student1.png";
import discoverU2 from "../../assets/discoverU/student2.png";
import discoverU3 from "../../assets/discoverU/student3.png";
import discoverU4 from "../../assets/discoverU/student4.png";
import discoverU5 from "../../assets/discoverU/guidance.png";
import discoverU6 from "../../assets/discoverU/psych.png";
import discoverU7 from "../../assets/discoverU/psych1.png";

import valkyrie from "../../assets/valkyrie/valkyrie.png";
import valkyrie1 from "../../assets/valkyrie/valkyrie1.png";
import valkyrie2 from "../../assets/valkyrie/valkyrie2.png";
import valkyrie3 from "../../assets/valkyrie/valkyrie3.png";
import valkyrie4 from "../../assets/valkyrie/valkyrie4.png";
import valkyrie5 from "../../assets/valkyrie/valkyrie5.png";

import resv from "../../assets/resv/resv.png";
import resv1 from "../../assets/resv/resv1.png";
import resv2 from "../../assets/resv/resv2.png";
import resv3 from "../../assets/resv/resv3.png";
import resv4 from "../../assets/resv/resv4.png";





type Project = {
  name: string;
  description: string;
  urls: { label: string; link: string }[]; // 👈 updated
  images: string[];
  techStack: string[];
};


const projects: Project[] = [
  {
    name: "DiscoverU",
    description:
      "A web-based platform using OMR and real-time analytics to automate psychological assessments for Cavite State University – Bacoor City Campus, improving accuracy, speed, and counseling efficiency. This project have 3 level of access, the Student, Guidance(Admin), and Psychology(Super Admin).",
    urls: [
      { label: "Student", link: "https://student-taupe-two.vercel.app" },
      { label: "Guidance", link: "https://guidance-ashen.vercel.app" },
      { label: "Psychology", link: "https://psychology-eight.vercel.app" },
    ],
    images: [discoverU, discoverU1, discoverU2, discoverU3, discoverU4, discoverU5, discoverU6, discoverU7],
    techStack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Firebase Storage", "Python", "OpenCV"],
  },
  {
    name: "Launchpad Reservation",
    description: "The ResV project, a seat reservation platform, aims to simplify the process of managing seat reservations for both administrators and customers. Built using a robust tech stack, including React for the user interface and Node.js with Express for the backend, ResV provides a responsive, reliable, and user-friendly experience..",
    urls: [{ label: "Link", link: "https://res-v.vercel.app" }],
    images: [resv, resv1, resv2, resv3, resv4],
    techStack: ["React", "Node.js", "Express", "Mongodb", "Firebase"],
  },
  {
    name: "Valkyrie",
    description: "The Valkyrie is a 2d Role-playing and adventure game created from Unity where the character embarks on an adventure of battling all the enemies she encounters along the way. The character is named Lyra, a woman who lives in a tribe that has been invaded by enemies. Now, it’s time for her to take her revenge and save her home.",
    urls: [{ label: "File", link: "https://drive.google.com/drive/folders/1eGeS_DXDEDwsFL36Q9OAUaHfzQXO-209?usp=sharing" }],
    images: [valkyrie, valkyrie1, valkyrie2, valkyrie3, valkyrie4, valkyrie5],
    techStack: ["c#", "Unity", "2d" ],
  },
];


const Projects = () => {
  const [animate, setAnimate] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentSlide(0);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Auto slideshow (no manual buttons)
  useEffect(() => {
    if (selectedProject && selectedProject.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % selectedProject.images.length);
      }, 2000); // switch every 3 seconds

      return () => clearInterval(interval);
    }
  }, [selectedProject]);

  return (
    <div className={`${styles.projectsPage} ${reverse ? styles.reverse : ""}`}>
      <button className={styles.backButton} onClick={handleBack}>
        🌐↩
      </button>

      <div
        className={`${styles.projectsGrid} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className={styles.projectCard}
            onClick={() => handleOpenModal(project)}
          >
           <div className={styles.cardImage}>
  {project.name}
</div>

          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedProject.name}</h2>

            {/* Automatic Slideshow */}
            {selectedProject.images.length > 0 && (
              <div className={styles.slideshow}>
                <img
                  src={selectedProject.images[currentSlide]}
                  alt={`${selectedProject.name} slide`}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
              </div>
            )}

            <p>{selectedProject.description}</p>

            <h3>Tech Used:</h3>
            <ul>
              {selectedProject.techStack.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>

            <div className={styles.modalActions}>
              {selectedProject.urls.map((url, idx) => (
              <a
                key={idx}
                href={url.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url.label}
              </a>
            ))}
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
