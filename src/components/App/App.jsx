import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { syncFavorites } from "../../redux/favorites/slice";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Catalog from "../Catalog/Catalog";
import CamperDetails from "../CamperDetails/CamperDetails";
import Page404 from "../Page404/Page404";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "favorites") {
        const newFavs = e.newValue ? JSON.parse(e.newValue) : [];
        dispatch(syncFavorites(newFavs));
      }
    };

    const handleFocus = () => {
      const saved = localStorage.getItem("favorites");
      dispatch(syncFavorites(saved ? JSON.parse(saved) : []));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<CamperDetails />} />
        <Route path="*" element={<Page404 allowBack={true} />} />
      </Routes>
    </>
  );
}

export default App;
