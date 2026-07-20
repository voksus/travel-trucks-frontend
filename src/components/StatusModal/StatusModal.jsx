import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { LuCircleCheckBig } from "react-icons/lu";
import styles from "./StatusModal.module.css";

const StatusModal = ({
  status = "loading", // "loading" | "success"
  type = "",
  title,
  message,
  onClose,
  autoCloseDelay,
}) => {
  useEffect(() => {
    if (autoCloseDelay && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoCloseDelay, onClose]);

  useEffect(() => {
    if (!onClose) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const displayTitle = title || `Loading ${type}...`;
  const displayMessage = message || (
    <>
      Please wait while we fetch the best
      <br />
      travel trucks for you
    </>
  );

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-modal-title"
      >
        {status === "loading" ? (
          <ScaleLoader
            color="var(--gray-green)"
            barCount={4}
            height={36}
            margin={3}
            width={5}
          />
        ) : (
          <LuCircleCheckBig className={styles.successIcon} />
        )}
        <h3 id="status-modal-title" className={styles.title}>
          {displayTitle}
        </h3>
        <p className={styles.text}>{displayMessage}</p>
      </div>
    </div>
  );
};

export default StatusModal;
