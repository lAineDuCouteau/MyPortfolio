import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Contacts.module.scss";
import contactsPic from "../../assets/me/contacts.png";


const Contacts = () => {
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
      navigate(-1);
    }, 600);
  };

  return (
    <section className={styles.contacts}>
      <button className={styles.backButton} onClick={handleBack}>
        🌐↩
      </button>

      <div
        className={`${styles.content} ${
          animate && !reverse ? styles.zoomInOut : ""
        } ${reverse ? styles.zoomInFade : ""}`}
      >
        <div className={styles.image}>
          <img src={contactsPic} alt="Kelly S. Soberano" />
        </div>
        <div className={styles.text}>
          <h1 className={styles.title}>Get in Touch</h1>

          <div className={styles.contactList}>
            <a
              href="https://www.facebook.com/DuCouteau64"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg> 
              Facebook
            </a>
            <a
              href="https://m.me/DuCouteau64"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.863-1.26l-.305-.178l-3.032.892a1.01 1.01 0 0 1-1.28-1.145l.026-.109l.892-3.032A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2M9.793 9.793l-3 3a1 1 0 1 0 1.414 1.414l2.293-2.293l2.293 2.293a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L13.5 12.086l-2.293-2.293a1 1 0 0 0-1.414 0"/></g></svg> 
              Messenger
            </a>
            <a
              onClick={() => {
                navigator.clipboard.writeText("+639260544375");
                alert("Phone number copied!");
              }}
              className={styles.contactItem}
              style={{ cursor: "pointer" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"/></svg> 
              +63 926 054 4375
            </a>
            <a
              href="https://t.me/iamkelllll"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38"/></svg> 
              Telegram
            </a>
            <a
              href="viber://chat?number=%2B639260544375"
              className={styles.contactItem}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="currentColor" d="M7.965 6.202a.82.82 0 0 0-.537.106h-.014c-.375.22-.713.497-1.001.823c-.24.277-.37.557-.404.827c-.02.16-.006.322.041.475l.018.01c.27.793.622 1.556 1.052 2.274a13.4 13.4 0 0 0 2.03 2.775l.024.034l.038.028l.023.027l.028.024a13.6 13.6 0 0 0 2.782 2.04c1.155.629 1.856.926 2.277 1.05v.006c.123.038.235.055.348.055a1.6 1.6 0 0 0 .964-.414c.325-.288.6-.627.814-1.004v-.007c.201-.38.133-.738-.157-.981A12 12 0 0 0 14.41 13c-.448-.243-.903-.096-1.087.15l-.393.496c-.202.246-.568.212-.568.212l-.01.006c-2.731-.697-3.46-3.462-3.46-3.462s-.034-.376.219-.568l.492-.396c.236-.192.4-.646.147-1.094a12 12 0 0 0-1.347-1.88a.75.75 0 0 0-.44-.263M12.58 5a.5.5 0 0 0 0 1c1.264 0 2.314.413 3.145 1.205c.427.433.76.946.978 1.508c.219.563.319 1.164.293 1.766a.5.5 0 0 0 1 .042a5.4 5.4 0 0 0-.361-2.17a5.4 5.4 0 0 0-1.204-1.854l-.01-.01C15.39 5.502 14.085 5 12.579 5"/><path fill="currentColor" d="M12.545 6.644a.5.5 0 0 0 0 1h.017c.912.065 1.576.369 2.041.868c.477.514.724 1.153.705 1.943a.5.5 0 0 0 1 .023c.024-1.037-.31-1.932-.972-2.646V7.83c-.677-.726-1.606-1.11-2.724-1.185l-.017-.002z"/><path fill="currentColor" d="M12.526 8.319a.5.5 0 1 0-.052.998c.418.022.685.148.853.317c.169.17.295.443.318.87a.5.5 0 1 0 .998-.053c-.032-.6-.22-1.13-.605-1.52c-.387-.39-.914-.58-1.512-.612"/><path fill="currentColor" fill-rule="evenodd" d="M7.067 2.384a22.15 22.15 0 0 1 9.664 0l.339.075a5.16 5.16 0 0 1 3.872 3.763a19.7 19.7 0 0 1 0 9.7a5.16 5.16 0 0 1-3.872 3.763l-.34.075a22.2 22.2 0 0 1-6.077.499L8 22.633a.75.75 0 0 1-1.24-.435l-.439-2.622a5.16 5.16 0 0 1-3.465-3.654a19.7 19.7 0 0 1 0-9.7a5.16 5.16 0 0 1 3.872-3.763zm9.337 1.463a20.65 20.65 0 0 0-9.01 0l-.34.076A3.66 3.66 0 0 0 4.31 6.591a18.2 18.2 0 0 0 0 8.962a3.66 3.66 0 0 0 2.745 2.668l.09.02a.75.75 0 0 1 .576.608l.294 1.758l1.872-1.675a.75.75 0 0 1 .553-.19a20.7 20.7 0 0 0 5.964-.445l.339-.076a3.66 3.66 0 0 0 2.745-2.668c.746-2.94.746-6.021 0-8.962a3.66 3.66 0 0 0-2.745-2.668z" clip-rule="evenodd"/></svg>
              Viber
            </a>
          </div>
        </div>
      </div>
      <div className={styles.fadeOverlay} />
    </section>
  );
};

export default Contacts;
