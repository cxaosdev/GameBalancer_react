/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import PlayerLol from "components/PlayerLol.jsx";

export default function Lol() {
  const [players, setPlayers] = useState(Array(10).fill({}));
  const updatePlayerInfo = (playerNum, info) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerNum] = info;
    setPlayers(updatedPlayers);
  };

  useEffect(() => {
    const tierColors = {
      Iron: "#5E5E5E",
      Bronze: "#8D6F46",
      Silver: "#BAC8D1",
      Gold: "#FFD700",
      Platinum: "#2C9FB4",
      Emerald: "#1CB952",
      Diamond: "#58B1E1",
      Master: "#B543EB",
      GrandMaster: "#E34033",
      Challenger: "#7DF7FE",
    };

    const labels = document.querySelectorAll(".players__tiers");

    labels.forEach((label) => {
      const tierText = label.textContent.trim();
      if (tierColors[tierText]) {
        label.style.color = tierColors[tierText];
      }
    });
  }, []);

  return (
    <div className="lol__container">
      {players.map((player, index) => (
        <PlayerLol
          className="players__list"
          key={index}
          playerNum={index + 1}
          updatePlayerInfo={updatePlayerInfo}
        />
      ))}
    </div>
  );
}