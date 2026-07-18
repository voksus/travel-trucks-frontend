import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Campers of your dreams</h1>
      <h2 className={styles.subtitle}>
        You can find everything you want in our catalog
      </h2>
      {/* Кнопка як посилання на каталог */}
      <Link to="/catalog" className={styles.button}>
        View Now
      </Link>
    </div>
  );
};

export default Hero;
