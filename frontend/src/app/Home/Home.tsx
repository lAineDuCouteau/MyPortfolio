import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>Welcome to MyPortfolio</h1>
        <p>Your one-stop place to showcase projects and skills 🚀</p>
        
        {/* Button navigates to /about */}
        <Link to="/about">
          <button className={styles.ctaButton}>Get Started</button>
        </Link>
      </header>
    </div>
  );
};

export default Home;
