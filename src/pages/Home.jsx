import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeagueLogo from "../assets/logo/LeagueOfLegends.webp";
import ValorantLogo from "../assets/logo/Valorant.svg";
import OnBoarding from "components/OnBoarding";
import Onboarding from "components/OnBoarding";

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
      className={`vlrt__container relative bg-no-repeat pt-[12vh] ${
        selectedGame === "LeagueOfLegends"
          ? "bg-[url('../assets/lol_background.jpg')]"
          : "bg-[url('../assets/vlrt_background.jpg')]"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mt-[8vw] text-center">
          <h1 className="mb-3 text-6xl font-bold">Welcome to Game Balancer</h1>
          <p className="text-3xl">
            Create fair matches for your favorite games!
          </p>
        </div>
        <div className="mt-[4rem] flex gap-[4rem]">
          <button
            className={`w-[13rem] rounded-lg border-4 p-2 transition-all duration-300 ${
              selectedGame === "LeagueOfLegends"
                ? "border-yellow-500 bg-yellow-900/20"
                : "border-transparent hover:border-yellow-500"
            }`}
            onClick={() => handleSelectGame("LeagueOfLegends")}
          >
            <img
              src={LeagueLogo}
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
              src={ValorantLogo}
              alt="Valorant"
              className="h-[8rem] w-full object-contain"
            />
          </button>
        </div>
        <button
          className="mt-6 cursor-pointer rounded-md bg-gradient-to-r from-red-800 to-indigo-800 p-3 text-2xl text-[30px] font-semibold text-white shadow-sm hover:from-red-900 hover:to-indigo-900 focus:ring-2"
          onClick={handleGetStarted}
          disabled={!selectedGame}
        >
          Get Started
        </button>
        <div className="mt-[8rem] flex flex-col justify-center">
          <span className="animate-bounce text-3xl">▼ How to use</span>
        </div>
        <Onboarding></Onboarding>
      </div>
    </div>
  );
}
