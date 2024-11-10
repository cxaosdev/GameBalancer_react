import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LeagueLogo from "../assets/logo/LeagueOfLegends.webp";
import ValorantLogo from "../assets/logo/Valorant.svg";
import Onboarding from "components/OnBoarding";

export default function Home({ selectedGame, setSelectedGame, isKorean }) {
  const navigate = useNavigate();
  const onboardingRef = useRef(null);

  useEffect(() => {
    setSelectedGame(null);
  }, [setSelectedGame]);

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
      className={`scrollbar-custom page-container vlrt__container relative bg-no-repeat pt-[12vh] ${
        selectedGame === "LeagueOfLegends"
          ? "bg-[url('../assets/league%20of%20legends/c-o-war-2020-01.webp')]"
          : "bg-[url('../assets/valorant/Valorant_EP-8-Teaser_The-arrival.webp')]"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mt-[8vw] text-center">
          <h1 className="mb-3 text-6xl font-bold">Welcome to Game Balancer</h1>
          <p className={`text-3xl ${isKorean ? "do-hyeon-regular" : ""}`}>
            {isKorean
              ? "손쉽게 팀을 구성하고 게임을 시작하세요!"
              : "Create fair matches for your favorite games!"}
          </p>
        </div>
        <div className="mb-[4rem] mt-[4rem] flex gap-[4rem]">
          <button
            className={`w-[13rem] transform rounded-xl border-4 p-2 transition-transform duration-300 hover:scale-105 active:scale-100 active:duration-75 ${
              selectedGame === "LeagueOfLegends"
                ? "border-amber-600 bg-amber-600/30"
                : "border-transparent hover:border-amber-600 hover:bg-amber-900/30"
            }`}
            onClick={() => setSelectedGame("LeagueOfLegends")}
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
                ? "border-rose-800 bg-rose-800/30"
                : "border-transparent hover:border-rose-800 hover:bg-rose-800/20"
            }`}
            onClick={() => setSelectedGame("Valorant")}
          >
            <img
              src={ValorantLogo}
              alt="Valorant"
              className="h-[8rem] w-full object-contain"
            />
          </button>
        </div>
        <button
          className={`cursor-pointer rounded-md bg-gradient-to-bl from-rose-900 to-amber-500 px-4 py-3 text-2xl text-[30px] font-semibold text-white shadow-sm hover:from-pink-700 hover:to-amber-400 focus:outline-none focus:ring-0 active:from-red-500 active:to-amber-300 ${isKorean ? "do-hyeon-regular" : ""}`}
          onClick={handleGetStarted}
          disabled={!selectedGame}
        >
          {isKorean ? "시작하기" : "Get Started"}
        </button>

        <div className="mt-[10vh] flex flex-col justify-center">
          <span
            className={`animate-bounce cursor-pointer text-3xl ${isKorean ? "do-hyeon-regular" : ""}`}
            onClick={handleScrollToOnboarding}
          >
            ▼ {isKorean ? "사용 방법" : "How to use"}
          </span>
        </div>
        <div ref={onboardingRef}>
          <Onboarding isKorean={isKorean} />
        </div>
      </div>
    </div>
  );
}
