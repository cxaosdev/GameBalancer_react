import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Lol from "./pages/Lol";
import Vlrt from "./pages/Vlrt";
import Footer from "components/Footer";

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Vlrt />} />
          <Route path="/LeagueOfLegends" element={<Lol />} />
          <Route path="/Valorant" element={<Vlrt />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
