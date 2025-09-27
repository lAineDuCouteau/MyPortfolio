import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Welcome to my World!
      </div>

      
    </header>
  );
};

export default Header;
