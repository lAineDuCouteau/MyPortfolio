import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Contacts.module.scss";
import contactsPic from "../../assets/contacts.png";


// import react-icons for icons
import { FaTelegramPlane, FaViber } from "react-icons/fa";
import { BsMessenger, BsFacebook } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";

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
              <BsFacebook /> Facebook
            </a>
            <a
              href="https://m.me/DuCouteau64"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <BsMessenger /> Messenger
            </a>
            <a
              onClick={() => {
                navigator.clipboard.writeText("+639260544375");
                alert("Phone number copied!");
              }}
              className={styles.contactItem}
              style={{ cursor: "pointer" }}
            >
              <FiPhone /> +63 926 054 4375
            </a>
            <a
              href="https://t.me/iamkelllll"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <FaTelegramPlane /> Telegram
            </a>
            <a
              href="viber://chat?number=%2B1234567890"
              className={styles.contactItem}
            >
              <FaViber /> Viber
            </a>
          </div>

          
        </div>
        
      </div>
      <div className={styles.fadeOverlay} />
    </section>
  );
};

export default Contacts;
