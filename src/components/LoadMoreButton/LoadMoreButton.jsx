import styles from "./LoadMoreButton.module.css";

const LoadMoreButton = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      disabled={disabled}
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;
