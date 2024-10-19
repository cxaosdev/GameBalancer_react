import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  const handleGetStarted = () => {
    if (selectedGame === "LeagueOfLegends") {
      navigate("/LeagueOfLegends");
    } else if (selectedGame === "Valorant") {
      navigate("/Valorant");
    }
  };

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center bg-black bg-cover bg-fixed bg-center text-white bg-blend-overlay ${
        selectedGame === "LeagueOfLegends"
          ? "bg-opacity-50 bg-[url('../assets/lol_background.jpg')]"
          : "bg-opacity-50 bg-[url('../assets/vlrt_background.jpg')]"
      }`}
      style={{ backgroundSize: "100vw auto" }}
    >
      <div className="mb-5 text-center">
        <h1 className="mb-3 text-6xl font-bold">Welcome to Game Balancer</h1>
        <p className="text-3xl">Create fair matches for your favorite games!</p>
      </div>
      <div className="flex gap-[5rem]">
        <button
          className={`w-[13rem] rounded-lg border-4 p-2 transition-all duration-300 ${
            selectedGame === "LeagueOfLegends"
              ? "border-yellow-500 bg-yellow-900/20"
              : "border-transparent hover:border-yellow-500"
          }`}
          onClick={() => handleSelectGame("LeagueOfLegends")}
        >
          <img
            src="/src/assets/logo/LeagueOfLegends.webp"
            alt="League of Legends"
            className="h-[8rem] w-full object-contain"
          />
        </button>
        <button
          className={`w-[13rem] rounded-lg border-4 p-2 transition-all duration-300 ${
            selectedGame === "Valorant"
              ? "border-red-500 bg-red-900/20"
              : "border-transparent hover:border-red-500"
          }`}
          onClick={() => handleSelectGame("Valorant")}
        >
          <img
            src="/src/assets/logo/Valorant.svg"
            alt="Valorant"
            className="h-[8rem] w-full object-contain"
          />
        </button>
      </div>
      <button
        className="mt-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-2xl text-[30px] font-semibold text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 focus:ring-2 active:from-purple-800 active:to-indigo-800 active:outline-none active:ring-indigo-500 active:ring-offset-2"
        onClick={handleGetStarted}
        disabled={!selectedGame}
      >
        Get Started
      </button>
    </div>
  );
}
