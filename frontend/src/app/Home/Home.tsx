import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>Welcome to My Portfolio</h1>
        <p>Programming is like planting ideas into a machine, if you nurture them with logic and patience, they grow into solutions.</p>
        
        {/* Button navigates to /about */}
        <Link to="/globe">
          <button className={styles.ctaButton}>˙⋆🌟⋆˙</button>
        </Link>
      </header>
    </div>
  );
};

export default Home;
