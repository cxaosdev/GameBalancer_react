import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Lol from "./pages/Lol";
import Vlrt from "./pages/Vlrt";
import Home from "./pages/Home";
import Footer from "components/Footer";
import { useState } from "react";

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isKorean, setIsKorean] = useState(false);

  const toggleLanguage = () => {
    setIsKorean((prev) => !prev);
  };

  return (
    <div className="root-wrap flex h-screen flex-col overflow-hidden">
      <BrowserRouter>
        <Header
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          isKorean={isKorean}
          toggleLanguage={toggleLanguage}
        />
        <div className="flex flex-1 flex-col overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectedGame={selectedGame}
                  setSelectedGame={setSelectedGame}
                  isKorean={isKorean}
                />
              }
            />
            <Route path="/leagueOfLegends" element={<Lol />} />
            <Route path="/valorant" element={<Vlrt />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
