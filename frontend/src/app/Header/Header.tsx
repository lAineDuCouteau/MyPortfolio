import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Kelly Saguid Soberano
      </div>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/globe">Globe</Link>
        <Link to="/about">About Me</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/music">Music</Link>
        <Link to="/hobbies">Hobbies</Link>
        <Link to="/foods">Foods</Link>
      </nav>
    </header>
  );
};

export default Header;
