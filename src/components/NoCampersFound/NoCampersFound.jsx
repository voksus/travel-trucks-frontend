import React from "react";
import styles from "./NoCampersFound.module.css";

const NoCampersFound = ({ onClearFilters, onViewAll }) => {
  return (
    <div className={styles.container}>
      <img
        src="/nothing-found.webp"
        alt="Nothing found"
        className={styles.image}
      />

      <h3 className={styles.title}>No campers found</h3>

      <p className={styles.description}>
        We couldn`t find any campers that match your filters.
        <br /> Try adjusting your search or clearing some filters.
      </p>

      <div className={styles.buttonsGroup}>
        <button
          type="button"
          onClick={onClearFilters}
          className={styles.clearBtn}
        >
          ✕ Clear filters
        </button>

        <button type="button" onClick={onViewAll} className={styles.viewAllBtn}>
          View all campers
        </button>
      </div>
    </div>
  );
};

export default NoCampersFound;
