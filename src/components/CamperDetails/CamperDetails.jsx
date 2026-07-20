import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, toggleFavorite } from "../../redux/favorites/slice";
import api from "../../services/api";
import StatusModal from "../StatusModal/StatusModal";

import Page404 from "../Page404/Page404";
import CamperGallery from "./components/CamperGallery";
import CamperInfo from "./components/CamperInfo";
import CamperFeatures from "./components/CamperFeatures";
import CamperReviews from "./components/CamperReviews";
import BookingForm from "./components/BookingForm";

import styles from "./CamperDetails.module.css";

const CamperDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [camper, setCamper] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.includes(id);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/campers/${id}`)
      .then((response) => {
        setCamper(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  if (isLoading) {
    return <StatusModal type="camper details" />;
  }

  if (!camper || typeof camper !== "object" || !camper.id) {
    return <Page404 />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <CamperGallery gallery={camper.gallery} name={camper.name} />

        <div className={styles.infoColumn}>
          <CamperInfo
            camper={camper}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
          <CamperFeatures camper={camper} />
        </div>
      </div>

      <h3 className={styles.reviewsTitle}>Reviews</h3>
      <div className={styles.bottomSection}>
        <CamperReviews reviews={camper.reviews} />

        <div className={styles.bookingColumn}>
          <BookingForm onSubmitSuccess={() => setShowSuccessModal(true)} />
        </div>
      </div>

      {showSuccessModal && (
        <StatusModal
          status="success"
          title="Booking successful!"
          message="Thank you! Your booking request has been successfully sent. We will contact you soon."
          onClose={() => setShowSuccessModal(false)}
          autoCloseDelay={2500}
        />
      )}
    </div>
  );
};

export default CamperDetails;
