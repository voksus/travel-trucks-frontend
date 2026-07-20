import { formatPrice, formattedLocation } from "../../../utils/formatters";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa6";
import { ImMap2 } from "react-icons/im";
import styles from "../CamperDetails.module.css";

const CamperInfo = ({ camper, isFavorite, onToggleFavorite }) => {
  const { id, name, price, rating, location, description, reviews } = camper;

  return (
    <div className={styles.detailsBlock}>
      <div className={styles.titleRow}>
        <h2 className={styles.name}>{name}</h2>
        <button
          type="button"
          className={styles.favoriteBtn}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <FaHeart
              className={`${styles.heartIcon} ${styles.heartIconActive}`}
            />
          ) : (
            <FaRegHeart className={styles.heartIcon} />
          )}
        </button>
      </div>

      <div className={styles.ratingLocationRow}>
        <div className={styles.ratingGroup}>
          <FaStar className={styles.starIcon} />
          <span className={styles.ratingText}>
            {rating} ({reviews?.length || 0} Reviews)
          </span>
        </div>
        <div className={styles.locationGroup}>
          <ImMap2 className={styles.mapIcon} />
          <span className={styles.locationText}>
            {formattedLocation(location)}
          </span>
        </div>
      </div>

      <span className={styles.price}>{formatPrice(price)}</span>
      <p className={styles.description}>{description}</p>
      <div className={styles.idBadge}>
        <span>#</span>
        {id}
      </div>
    </div>
  );
};

export default CamperInfo;
