import { FaStar } from "react-icons/fa6";
import styles from "../CamperDetails.module.css";

const CamperReviews = ({ reviews }) => {
  return (
    <div className={styles.reviewsColumn}>
      <div className={styles.reviewsList}>
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatar}>
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.reviewMeta}>
                  <span className={styles.reviewerName}>
                    {review.reviewer_name}
                  </span>
                  <div className={styles.starsRow}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.reviewer_rating
                            ? styles.starIconActive
                            : styles.starIconInactive
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className={styles.noReviews}>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default CamperReviews;
