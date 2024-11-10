import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import logo from "../components/logo2.jpg";

function Header({ selectedGame, setSelectedGame, isKorean, toggleLanguage }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const handleGame = (event) => {
    const game = event.target.value;
    setSelectedGame(game);
    if (game === "LeagueOfLegends") {
      navigate("/leagueOfLegends");
    } else if (game === "Valorant") {
      navigate("/valorant");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLanguageToggle = () => {
    setIsLanguageMenuOpen((prev) => !prev);
  };

  const selectLanguage = (language) => {
    if ((language === "KR" && !isKorean) || (language === "EN" && isKorean)) {
      toggleLanguage();
    }
    setIsLanguageMenuOpen(false);
  };

  return (
    <div
      className={`header fixed left-0 top-0 z-[1000] flex h-[10vh] w-full items-center justify-between bg-black bg-opacity-70 p-0 ${
        isHeaderVisible ? "visible" : "hidden"
      }`}
    >
      <div
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer header__title"
      >
        <img className="ml-[1.5rem] w-[2.2rem]" src={logo} alt="Logo" />
        <span className="ml-[1.2rem] mt-[0.2rem] hidden text-[2.7rem] leading-none xs:inline">
          Game Balancer
        </span>
      </div>

      {/* Hamburger menu button */}
      <button
        className="mr-[1.5rem] flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.5rem] bg-black bg-opacity-80 md:hidden"
        onClick={toggleMenu}
      >
        <span className="text-aliceblue text-[2rem]">☰</span>
      </button>

      {isMenuOpen && (
        <div className="absolute left-0 top-[10vh] flex w-full flex-col items-center space-y-4 bg-black bg-opacity-90 p-4 md:hidden">
          <label
            onClick={() => handleGame({ target: { value: "LeagueOfLegends" } })}
            className={`font-new-amsterdam text-aliceblue cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
              selectedGame === "LeagueOfLegends"
                ? "bg-amber-600 font-bold text-white"
                : "hover:text-amber-500"
            } ${isKorean ? "do-hyeon-regular" : ""}`}
          >
            {isKorean ? "리그 오브 레전드" : "League of Legends"}
          </label>
          <label
            onClick={() => handleGame({ target: { value: "Valorant" } })}
            className={`font-new-amsterdam text-aliceblue cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
              selectedGame === "Valorant"
                ? "bg-red-800 font-bold text-white"
                : "hover:text-red-500"
            } ${isKorean ? "do-hyeon-regular" : ""}`}
          >
            {isKorean ? "발로란트" : "Valorant"}
          </label>
        </div>
      )}
      <div className="flex">
        <div className="header__game mb-[10px] ml-[30px] mt-[15px] hidden items-center md:flex">
          <input
            id="toggle-on"
            value="LeagueOfLegends"
            type="radio"
            checked={selectedGame === "LeagueOfLegends"}
            onChange={handleGame}
            className="hidden"
          />
          <label
            htmlFor="toggle-on"
            className={`font-new-amsterdam text-aliceblue mr-[15px] inline-block cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[3vh] transition-colors duration-300 ${
              selectedGame === "LeagueOfLegends"
                ? "bg-amber-600 font-bold text-white"
                : "hover:text-amber-500"
            } ${isKorean ? "do-hyeon-regular text-[2.7vh]" : ""}`}
          >
            {isKorean ? "리그 오브 레전드" : "League of Legends"}
          </label>
          <input
            id="toggle-off"
            value="Valorant"
            type="radio"
            checked={selectedGame === "Valorant"}
            onChange={handleGame}
            className="hidden"
          />
          <label
            htmlFor="toggle-off"
            className={`font-new-amsterdam text-aliceblue mr-[15px] inline-block cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[3vh] transition-colors duration-300 ${
              selectedGame === "Valorant"
                ? "bg-red-800 font-bold text-white"
                : "hover:text-red-500"
            } ${isKorean ? "do-hyeon-regular text-[2.7vh]" : ""}`}
          >
            {isKorean ? "발로란트" : "Valorant"}
          </label>
        </div>
        <div className="mr-7 flex items-center space-x-2 text-[2.5vh]">
          <MdLanguage size={24} />
          <div className="flex w-[60px] justify-between">
            <span
              onClick={() => selectLanguage("KR")}
              className={`${
                isKorean ? "font-bold text-amber-600" : "text-white"
              } cursor-pointer no-underline`}
              style={{
                textDecoration: "none",
                width: "30px",
                textAlign: "center",
              }}
            >
              KR
            </span>
            <span>/</span>
            <span
              onClick={() => selectLanguage("EN")}
              className={`${
                !isKorean ? "font-bold text-amber-600" : "text-white"
              } cursor-pointer no-underline`}
              style={{
                textDecoration: "none",
                width: "30px",
                textAlign: "center",
              }}
            >
              EN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
