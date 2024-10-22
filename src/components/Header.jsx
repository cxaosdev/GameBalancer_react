import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../components/logo.jpg";

function Header() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState("");
  // const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > lastScrollY && window.scrollY > 100) {
  //       setIsHeaderVisible(false);
  //     } else {
  //       setIsHeaderVisible(true);
  //     }
  //     setLastScrollY(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [lastScrollY]);

  const handleGame = (event) => {
    const game = event.target.value;
    setSelectedGame(game);
    if (game === "League of Legends") {
      navigate("/LeagueOfLegends");
    } else if (game === "Valorant") {
      navigate("/Valorant");
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
        className="flex items-center cursor-pointer header__title"
      >
        <img className="ml-[1.5rem] w-[2.2rem]" src={logo} alt="Logo" />
        <span className="xs:inline ml-[1.2rem] mt-[0.2rem] hidden text-[2.7rem] leading-none">
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
          value="League of Legends"
          type="radio"
          checked={selectedGame === "League of Legends"}
          onChange={handleGame}
          className="hidden"
        />
        <label
          htmlFor="toggle-on"
          className={`font-new-amsterdam text-aliceblue mr-[15px] inline-block cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
            selectedGame === "League of Legends"
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

      {isMenuOpen && (
        <div className="absolute left-0 top-[10vh] z-[999] flex w-full flex-col items-center bg-black bg-opacity-80 py-4 md:hidden">
          <input
            id="toggle-on"
            value="League of Legends"
            type="radio"
            checked={selectedGame === "League of Legends"}
            onChange={handleGame}
            className="hidden"
          />
          <label
            htmlFor="toggle-on"
            className={`font-new-amsterdam text-aliceblue mb-[15px] inline-block cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
              selectedGame === "League of Legends"
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
            className={`font-new-amsterdam text-aliceblue mb-[15px] inline-block cursor-pointer rounded-[25px] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
              selectedGame === "Valorant"
                ? "bg-indigo-600 font-bold text-white"
                : "hover:text-indigo-600"
            }`}
          >
            Valorant
          </label>
        </div>
      )}
    </div>
  );
}

export default Header;
