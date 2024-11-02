import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../components/logo.jpg";

function Header({ selectedGame, setSelectedGame }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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

  return (
    <div
      className={`header fixed left-0 top-0 z-[1000] flex h-[10vh] w-full items-center justify-between bg-black bg-opacity-70 p-0 ${
        isHeaderVisible ? "visible" : "hidden"
      }`}
    >
      <div
        onClick={() => navigate("/")}
        className="header__title flex cursor-pointer items-center"
      >
        <img className="ml-[1.5rem] w-[2.2rem]" src={logo} alt="Logo" />
        <span className="ml-[1.2rem] mt-[0.2rem] hidden text-[2.7rem] leading-none xs:inline">
          Game Balancer
        </span>
      </div>

      <button
        className="mr-[1.5rem] flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.5rem] bg-black bg-opacity-80 md:hidden"
        onClick={toggleMenu}
      >
        <span className="text-aliceblue text-[2rem]">☰</span>
      </button>

      <div className="header__game mb-[10px] ml-[30px] mt-[15px] hidden md:flex">
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
          className={`font-new-amsterdam text-aliceblue mr-[15px] inline-block cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
            selectedGame === "LeagueOfLegends"
              ? "bg-indigo-600 font-bold text-white"
              : "hover:text-indigo-600"
          }`}
        >
          League of Legends
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
          className={`font-new-amsterdam text-aliceblue mr-[15px] inline-block cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
            selectedGame === "Valorant"
              ? "bg-indigo-600 font-bold text-white"
              : "hover:text-indigo-600"
          }`}
        >
          Valorant
        </label>
      </div>
    </div>
  );
}

export default Header;
