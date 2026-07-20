import { Link } from "react-router-dom";
import styles from "./Page404.module.css";

const Page404 = () => {
  return (
    <div className={styles.container}>
      <h1><span>🥴 </span>404</h1>
      <h3>Lost in the Digital Wilderness</h3>
      <p>
        It seems this camper has driven off the map! But don’t worry, there are
        plenty of other adventures waiting.
      </p>
      <Link to="/" className={styles.button}>
        Back to Homepage
      </Link>
    </div>
  );
};

export default Page404;
