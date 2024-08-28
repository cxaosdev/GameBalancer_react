import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="header_container">
      <img className="logo" src="/assets/GB.webp" alt="Galancer Logo" />
      <div id="Game">
        <input
          id="toggle-on"
          name="toggle"
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
          name="toggle"
          value="Valorant"
          type="radio"
          checked={selectedGame === "Valorant"}
          onChange={handleGame}
        />
        <label htmlFor="toggle-off" className="btn">
          Valorant
        </label>
      </div>
    </div>
  );
}

export default Header;
