import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const CamperDetails = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);

  useEffect(() => {
    api
      .get(`/campers/${id}`)
      .then((response) => setCamper(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <></> // відображення даних
  );
};
