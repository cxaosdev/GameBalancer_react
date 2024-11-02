import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LeagueLogo from "../assets/logo/LeagueOfLegends.webp";
import ValorantLogo from "../assets/logo/Valorant.svg";
import Onboarding from "components/OnBoarding";

export default function Home() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
  const onboardingRef = useRef(null);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  const handleGetStarted = () => {
    if (selectedGame === "LeagueOfLegends") {
      navigate("/leagueOfLegends");
    } else if (selectedGame === "Valorant") {
      navigate("/valorant");
    }
  };

  const handleScrollToOnboarding = () => {
    onboardingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className={`page-container vlrt__container relative bg-no-repeat pt-[12vh] ${
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
            className={`w-[13rem] transform rounded-xl border-4 p-2 transition-transform duration-300 hover:scale-105 active:scale-100 active:duration-75 ${
              selectedGame === "LeagueOfLegends"
                ? "border-amber-500 bg-amber-500/30"
                : "border-transparent hover:border-amber-500 hover:bg-amber-900/30"
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
            className={`w-[13rem] transform rounded-xl border-4 p-2 transition-transform duration-300 hover:scale-105 active:scale-100 active:duration-75 ${
              selectedGame === "Valorant"
                ? "border-red-500 bg-red-900/70"
                : "border-transparent hover:border-red-500 hover:bg-red-900/20"
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
          className="mt-8 cursor-pointer rounded-md bg-gradient-to-r from-red-700 to-indigo-800 px-5 py-4 text-2xl text-[30px] font-semibold text-white shadow-sm hover:from-red-600 hover:to-indigo-700 focus:ring-2 active:from-red-500 active:to-indigo-500"
          onClick={handleGetStarted}
          disabled={!selectedGame}
        >
          Get Started
        </button>

        <div className="mt-[10vh] flex flex-col justify-center">
          <span
            className="animate-bounce cursor-pointer text-3xl"
            onClick={handleScrollToOnboarding}
          >
            ▼ How to use
          </span>
        </div>
        <div ref={onboardingRef}>
          <Onboarding />
        </div>
      </div>
    </div>
  );
}
