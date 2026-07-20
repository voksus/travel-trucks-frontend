import { useState } from "react";
import styles from "../CamperDetails.module.css";

const CamperGallery = ({ gallery, name }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const mainImage =
    gallery && gallery[activeImageIndex]
      ? gallery[activeImageIndex].original || gallery[activeImageIndex].thumb
      : "";

  return (
    <div className={styles.galleryColumn}>
      <div className={styles.mainImageWrapper}>
        <img src={mainImage} alt={name} className={styles.mainImage} />
      </div>
      <div className={styles.thumbnailsRow}>
        {gallery?.map((img, index) => (
          <div
            key={index}
            className={`${styles.thumbnailWrapper} ${
              index === activeImageIndex ? styles.active : ""
            }`}
            onClick={() => setActiveImageIndex(index)}
          >
            <img
              src={img.thumb || img.original}
              alt={`${name} thumbnail ${index + 1}`}
              className={styles.thumbnailImg}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CamperGallery;
