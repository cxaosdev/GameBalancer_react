/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import PlayerVlrt from "components/PlayerVlrt.jsx";

const players = Array.from({ length: 10 }, (_, index) => `Player ${index + 1}`);
export default function Vlrt() {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const tierColors = {
      Iron: "#5E5E5E",
      Bronze: "#8D6F46",
      Silver: "#BAC8D1",
      Gold: "#FFD700",
      Platinum: "#54D3E0",
      Diamond: "#A770F0",
      Ascendant: "#1CB952",
      Immortal: "#C23A73",
      Radiant: "#F3992E",
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
    <div className="vlrt__container mt-[100px]">
      {players.map((player, index) => (
        <PlayerVlrt
          className="players__list"
          key={index}
          ㄴ
          playerNum={index + 1}
        />
      ))}
      <div className="flex justify-center mt-4 bg-transparent">
        <button
          className="w-[300px] text-[30px] flex items-center justify-center px-4 py-2 text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Generate Fair Match!
        </button>
      </div>

      {playerData.length > 0 && (
        <div className="mt-4">
          <h2>Collected Player Data:</h2>
          <ul>
            {playerData.map((player, index) => (
              <li key={index}>
                {player.playerName} - {player.tier}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
