import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Contacts.module.scss";
import contactsPic from "../../assets/contacts.png";

// import react-icons for icons
import { FaFacebook, FaTelegramPlane, FaViber } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { IconType } from "react-icons";

// Cast icons to IconType so TS accepts them as JSX components
const FacebookIcon: IconType = FaFacebook;
const MessengerIcon: IconType = BsMessenger;
const PhoneIcon: IconType = FiPhone;
const TelegramIcon: IconType = FaTelegramPlane;
const ViberIcon: IconType = FaViber;

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
              <FacebookIcon /> Facebook
            </a>
            <a
              href="https://m.me/DuCouteau64"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <MessengerIcon /> Messenger
            </a>
            <a
              onClick={() => {
                navigator.clipboard.writeText("+639260544375");
                alert("Phone number copied!");
              }}
              className={styles.contactItem}
              style={{ cursor: "pointer" }}
            >
              <PhoneIcon /> +63 926 054 4375
            </a>
            <a
              href="https://t.me/iamkelllll"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <TelegramIcon /> Telegram
            </a>
            <a
              href="viber://chat?number=%2B639260544375"
              className={styles.contactItem}
            >
              <ViberIcon /> Viber
            </a>
          </div>
        </div>
      </div>
      <div className={styles.fadeOverlay} />
    </section>
  );
};

export default Contacts;
