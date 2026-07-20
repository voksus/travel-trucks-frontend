import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImMap2 } from "react-icons/im";
import api from "../../services/api";
import {
  LuWind,
  LuShowerHead,
  LuUtensils,
  LuTv,
  LuRadio,
  LuFlame,
  LuDroplets,
} from "react-icons/lu";
import { BiFridge } from "react-icons/bi";
import { MdOutlineMicrowave } from "react-icons/md";

import { fetchCampers } from "../../redux/campers/operations";
import { selectFilters, selectLimit } from "../../redux/campers/selectors";
import {
  setFiltersState,
  resetFiltersState,
  resetCampersState,
} from "../../redux/campers/slice";

import styles from "./FilterSidebar.module.css";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const limit = useSelector(selectLimit);
  const globalFilters = useSelector(selectFilters);

  const [options, setOptions] = useState({
    forms: ["alcove", "panelTruck", "fullyIntegrated"],
    engines: ["diesel", "petrol", "hybrid"],
    transmissions: ["automatic", "manual"],
  });

  const [filters, setFilters] = useState(globalFilters);

  useEffect(() => {
    let active = true;

    const loadFilterOptions = async () => {
      try {
        const response = await api.get("/campers");
        if (!active) return;

        const allCampers = Array.isArray(response.data)
          ? response.data
          : response.data.items || [];

        const uniqueForms = [...new Set(allCampers.map((c) => c.form))].filter(
          Boolean,
        );
        const uniqueEngines = [
          ...new Set(allCampers.map((c) => c.engine)),
        ].filter(Boolean);
        const uniqueTransmissions = [
          ...new Set(allCampers.map((c) => c.transmission)),
        ].filter(Boolean);

        setOptions({
          forms: uniqueForms,
          engines: uniqueEngines,
          transmissions: uniqueTransmissions,
        });
      } catch (error) {
        if (active) {
          console.log("Filters options load error:", error);
        }
      }
    };

    loadFilterOptions();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setFilters(globalFilters);
  }, [globalFilters]);

  const formatValueForUI = (str) => {
    if (!str) return "";

    const customMappings = {
      panelTruck: "Panel Van",
      fullyIntegrated: "Fully Integrated",
      alcove: "Alcove",
    };

    if (customMappings[str]) {
      return customMappings[str];
    }
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFiltersState(filters));
    dispatch(resetCampersState());
    dispatch(fetchCampers({ page: 1, limit, filters }));
  };

  const handleClear = () => {
    dispatch(resetFiltersState());
    dispatch(resetCampersState());
    dispatch(
      fetchCampers({
        page: 1,
        limit,
        filters: {
          location: "",
          camperForm: "",
          engine: "",
          transmission: "",
          equipment: {
            AC: false,
            bathroom: false,
            kitchen: false,
            TV: false,
            radio: false,
            refrigerator: false,
            microwave: false,
            gas: false,
            water: false,
          },
        },
      }),
    );
  };

  return (
    <form className={styles.filterSidebar} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <ImMap2 className={styles.inputIcon} />
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
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
            {options.forms.map((formValue) => (
              <label key={formValue} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="camperForm"
                  value={formValue}
                  checked={filters.camperForm === formValue}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                <span className={styles.radioText}>
                  {formatValueForUI(formValue)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.label}>Engine</h3>
          <div className={styles.radioList}>
            {options.engines.map((engineValue) => (
              <label key={engineValue} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="engine"
                  value={engineValue}
                  checked={filters.engine === engineValue}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                <span className={styles.radioText}>
                  {formatValueForUI(engineValue)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.label}>Transmission</h3>
          <div className={styles.radioList}>
            {options.transmissions.map((transValue) => (
              <label key={transValue} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="transmission"
                  value={transValue}
                  checked={filters.transmission === transValue}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                <span className={styles.radioText}>
                  {formatValueForUI(transValue)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.label}>Advanced Equipment</h3>
          <div className={styles.checkboxList}>
            {[
              { key: "AC", label: "AC", icon: LuWind },
              { key: "bathroom", label: "Bathroom", icon: LuShowerHead },
              { key: "kitchen", label: "Kitchen", icon: LuUtensils },
              { key: "TV", label: "TV", icon: LuTv },
              { key: "radio", label: "Radio", icon: LuRadio },
              { key: "refrigerator", label: "Refrigerator", icon: BiFridge },
              {
                key: "microwave",
                label: "Microwave",
                icon: MdOutlineMicrowave,
              },
              { key: "gas", label: "Gas", icon: LuFlame },
              { key: "water", label: "Water", icon: LuDroplets },
            ].map((item) => {
              const Icon = item.icon;
              const isChecked = filters.equipment?.[item.key] || false;
              return (
                <label
                  key={item.key}
                  className={`${styles.checkboxLabel} ${isChecked ? styles.checked : ""}`}
                >
                  <input
                    type="checkbox"
                    name={item.key}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxText}>
                    <Icon className={styles.checkboxIcon} /> {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <button type="submit" className={styles.searchButton}>
        Search
      </button>

      <button
        type="button"
        onClick={handleClear}
        className={styles.clearButton}
      >
        ✕ Clear filters
      </button>
    </form>
  );
};

export default FilterSidebar;
