import React from "react";
import styles from "./AboutMe.module.scss";

const AboutMe = () => {
  return (
    <section className={styles.about}>
      <h2>About Me</h2>
      <div className={styles.content}>
        <div className={styles.text}>
          <p>
            Hi 👋 I’m <strong>Your Name</strong>, a passionate developer who loves
            building web applications with React, Node.js, and MongoDB. I enjoy
            solving problems and continuously learning new technologies.
          </p>
          <p>
            When I’m not coding, you’ll find me exploring design ideas,
            learning about AI, or enjoying some coffee ☕.
          </p>
        </div>
        <div className={styles.image}>
          {/* Replace with an actual image */}
          <img
            src="https://via.placeholder.com/200"
            alt="Your portrait"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

