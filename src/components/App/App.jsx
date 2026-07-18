import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Catalog from "../Catalog/Catalog";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<div>Деталі кемпера</div>} />
        <Route path="*" element={<div>Сторінку не знайдено</div>} />
      </Routes>
    </>
  );
}

export default App;
