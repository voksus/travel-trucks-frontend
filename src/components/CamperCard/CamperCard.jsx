import { formatBadgeText, formattedLocation } from "../../utils/formatters";
import { formatPrice } from "../../utils/formatters";
import { Link } from "react-router-dom";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa6";
import { ImMap2 } from "react-icons/im";
import { BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern, GiSurferVan } from "react-icons/gi";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper, isFavorite, onToggleFavorite }) => {
  const {
    id,
    name,
    price,
    rating,
    location,
    description,
    form,
    transmission,
    engine,
    gallery,
    reviews,
  } = camper;

  const truncatedDescription =
    description && description.length > 64
      ? `${description.slice(0, 64)}...`
      : description;

  const mainImage =
    gallery && gallery[0] ? gallery[0].thumb || gallery[0].original : "";

  return (
    <div className={styles.cardContainer}>
      <img src={mainImage} alt={name} className={styles.image} />
      <div className={styles.idBadge}>
        <span>#</span>
        {id}
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.titleRow}>
          <div className={styles.nameWrapper}>
            <h2 className={styles.name}>
              {name}
              <button
                type="button"
                className={styles.favoriteBtn}
                onClick={() => onToggleFavorite(id)}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isFavorite ? (
                  <FaHeart
                    className={`${styles.heartIcon} ${styles.heartIconActive}`}
                  />
                ) : (
                  <FaRegHeart className={styles.heartIcon} />
                )}
              </button>
            </h2>
          </div>
          <span className={styles.price}>{formatPrice(price)}</span>
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

        <p className={styles.description}>{truncatedDescription}</p>

        <div className={styles.badgesList}>
          {engine && (
            <div className={styles.badge}>
              <BsFuelPump className={styles.badgeIcon} />
              <span>{formatBadgeText(engine)}</span>
            </div>
          )}
          {transmission && (
            <div className={styles.badge}>
              <GiGearStickPattern className={styles.badgeIcon} />
              <span>{formatBadgeText(transmission)}</span>
            </div>
          )}
          {form && (
            <div className={styles.badge}>
              <GiSurferVan className={styles.badgeIcon} />
              <span>{formatBadgeText(form)}</span>
            </div>
          )}
        </div>

        <Link
          to={`/catalog/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.showMoreBtn}
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
