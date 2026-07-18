import { ImMap2 } from "react-icons/im";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.filterSidebar} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <ImMap2 className={styles.inputIcon} />
          <input
            type="text"
            className={styles.input}
            placeholder="City, Country"
          />
        </div>
      </div>
      <div className={styles.filtersGroup}>
        <p className={styles.filtersTitle}>Filters</p>
        <div className={styles.filterSection}>
          <h3 className={styles.label}>Camper form</h3>
          <div className={styles.radioList}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="camperForm"
                value="alcove"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Alcove</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="camperForm"
                value="panel-van"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Panel Van</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="camperForm"
                value="integrated"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Integrated</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="camperForm"
                value="semi-integrated"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Semi Integrated</span>
            </label>
          </div>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.label}>Engine</h3>
          <div className={styles.radioList}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="engine"
                value="diesel"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Diesel</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="engine"
                value="petrol"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Petrol</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="engine"
                value="hybrid"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Hybrid</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="engine"
                value="electric"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Electric</span>
            </label>
          </div>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.label}>Transmission</h3>
          <div className={styles.radioList}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="transmission"
                value="automatic"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Automatic</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="transmission"
                value="manual"
                className={styles.radioInput}
              />
              <span className={styles.customRadio}></span>
              <span className={styles.radioText}>Manual</span>
            </label>
          </div>
        </div>
      </div>
      <button type="submit" className={styles.searchButton}>
        Search
      </button>

      <button type="button" className={styles.clearButton}>
        ✕ Clear filters
      </button>
    </form>
  );
};
export default FilterSidebar;
