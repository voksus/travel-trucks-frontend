import { formatBadgeText } from "../../../utils/formatters";
import styles from "../CamperDetails.module.css";

const CamperFeatures = ({ camper }) => {
  const badges = [];

  ["transmission", "engine"].forEach((key) => {
    if (camper[key]) {
      badges.push({ label: formatBadgeText(camper[key]) });
    }
  });

  [
    "AC",
    "bathroom",
    "kitchen",
    "TV",
    "radio",
    "refrigerator",
    "microwave",
    "gas",
    "water",
  ].forEach((key) => {
    if (camper[key]) {
      const formattedLabel =
        key === "AC" || key === "TV"
          ? key
          : key.charAt(0).toUpperCase() + key.slice(1);

      badges.push({ label: formattedLabel });
    }
  });

  const dataConvert = (value) => {
    if (!value) return "";
    return value
      .replace(/(\d+(?:\.\d+)?)l/gi, "$1 L")
      .replace(/(\d+(?:\.\d+)?)m/gi, "$1 m")
      .replace(/\//g, " / ")
      .replace(/(\d+)km/gi, "$1 km");
  };

  const details = [
    { label: "Form", value: formatBadgeText(camper.form) },
    { label: "Length", value: dataConvert(camper.length) },
    { label: "Width", value: dataConvert(camper.width) },
    { label: "Height", value: dataConvert(camper.height) },
    { label: "Tank", value: dataConvert(camper.tank) },
    { label: "Consumption", value: dataConvert(camper.consumption) },
  ];

  return (
    <div className={styles.detailsBlock}>
      <h3 className={styles.blockTitle}>Vehicle details</h3>
      <div className={styles.badgesList}>
        {badges.map((badge, idx) => (
          <div key={idx} className={styles.badge}>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.detailsTable}>
        {details.map((detail, idx) => (
          <div key={idx} className={styles.tableRow}>
            <span className={styles.tableLabel}>{detail.label}</span>
            <span className={styles.tableValue}>{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CamperFeatures;
