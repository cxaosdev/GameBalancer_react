import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../components/logo.jpg";

function Header() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState("Valorant");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleGame = (event) => {
    const game = event.target.value;
    setSelectedGame(game);
    if (game === "League of Legends") {
      navigate("/LeagueOfLegends");
    } else if (game === "Valorant") {
      navigate("/Valorant");
    }
  };

  return (
    <div
      className={`header left-0 top-0 z-[1000] flex h-[13vh] w-full items-center justify-between p-0`}
    >
      <div className="header__title mb-[20px] mt-[10px] flex items-end">
        <img
          className="ml-[30px] mt-[10px] w-[50px] bg-transparent"
          src={logo}
          alt="Logo"
        />
        <span className="ml-[20px] mt-[10px] text-[50px] leading-none">
          Game Balancer
        </span>
      </div>
      <div className="header__game mb-[10px] ml-[30px] mt-[15px]">
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
          className={`font-new-amsterdam text-aliceblue mr-[15px] inline-block cursor-pointer rounded-[25px] bg-[#444] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
            selectedGame === "League of Legends"
              ? "bg-[#697dff] font-bold text-white"
              : "hover:bg-[#555]"
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
          className={`font-new-amsterdam text-aliceblue mr-[15px] inline-block cursor-pointer rounded-[25px] bg-[#444] px-[15px] py-[5px] text-[27px] transition-colors duration-300 ${
            selectedGame === "Valorant"
              ? "bg-[#697dff] font-bold text-white"
              : "hover:bg-[#555]"
          }`}
        >
          Valorant
        </label>
      </div>
    </div>
  );
}

export default Header;
