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
    <div className='header'>
      <div className='header__title'>
        <img className='header__title-logo' src='assets/logo.jpg' alt='Logo' />
        <span className='header__title-text'>Game Balancer</span>
      </div>
      <div className='header__game'>
        <input
          id='toggle-on'
          value='League of Legends'
          type='radio'
          checked={selectedGame === "League of Legends"}
          onChange={handleGame}
        />
        <label htmlFor='toggle-on' className='btn'>
          League of Legends
        </label>
        <input
          id='toggle-off'
          value='Valorant'
          type='radio'
          checked={selectedGame === "Valorant"}
          onChange={handleGame}
        />
        <label htmlFor='toggle-off'>Valorant</label>
      </div>
    </div>
  );
}

export default Header;
