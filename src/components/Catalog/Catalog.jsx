import FilterSidebar from "../FilterSidebar/FilterSidebar";
import CampersList from "../CampersList/CampersList";
import styles from "./Catalog.module.css";

const Catalog = () => {
  return (
    <div className={styles.container}>
      <FilterSidebar />
      <div className={styles.content}>
        <CampersList />
      </div>
    </div>
  );
};

export default Catalog;
