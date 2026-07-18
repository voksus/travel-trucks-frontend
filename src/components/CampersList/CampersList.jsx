import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import styles from "./CampersList.module.css";

const CampersList = () => {
  return (
    <div className={styles.campersList}>
      <div className={styles.placeholder}>
        Тут відображатиметься список знайдених кемперів.
      </div>
      <LoadMoreButton />
    </div>
  );
};

export default CampersList;
