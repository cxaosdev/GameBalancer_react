import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../components/logo.jpg";

function Header() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState("League of Legends");

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
    <div className="fixed top-0 left-0 w-[100%] flex items-center justify-between p-0 header ">
      <div className="header__title flex mt-[10px] mb-[20px] items-end">
        <img
          className="header__title-logo mt-[10px] ml-[30px] w-[50px] bg-transparent"
          src={logo}
          alt="Logo"
        />
        <span className="header__title-text ml-[20px] mt-[10px] text-[50px] leading-none">
          Game Balancer
        </span>
      </div>
      <div className="header__game mt-[15px] ml-[30px] mb-[10px] ">
        <input
          id="toggle-on"
          value="League of Legends"
          type="radio"
          checked={selectedGame === "League of Legends"}
          onChange={handleGame}
        />
        <label htmlFor="toggle-on" className="btn">
          League of Legends
        </label>
        <input
          id="toggle-off"
          value="Valorant"
          type="radio"
          checked={selectedGame === "Valorant"}
          onChange={handleGame}
        />
        <label htmlFor="toggle-off">Valorant</label>
      </div>
    </div>
  );
}

export default Header;
