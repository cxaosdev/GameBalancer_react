import React, { useState } from "react";
import PlayerVlrt from "components/PlayerVlrt.jsx";
import ResultModal from "components/ResultModal.jsx";

const players = Array.from({ length: 10 }, (_, index) => `Player ${index + 1}`);
export default function Vlrt() {
  const [playerData, setPlayerData] = useState(
    players.map((_, index) => ({
      playerName: `Player ${index + 1}`,
      tier: "Iron",
      pts: 7,
    }))
  );

  const tierToPoints = {
    Iron: 7,
    Bronze: 13,
    Silver: 17,
    Gold: 25,
    Platinum: 29,
    Diamond: 37,
    Ascendant: 43,
    Immortal: 45,
    Radiant: 48,
  };

  const [teams, setTeams] = useState({
    team1: [],
    team1Pts: 0,
    team2: [],
    team2Pts: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...playerData];
    updatedPlayers[index][field] = value;
    if (field === "tier") {
      updatedPlayers[index].pts = tierToPoints[value];
    }
    setPlayerData(updatedPlayers);
  };

  const handleGenerateTeams = () => {
    const sortedPlayers = [...playerData].sort((a, b) => b.pts - a.pts);

    let team1 = [];
    let team2 = [];
    let team1Pts = 0;
    let team2Pts = 0;

    sortedPlayers.forEach((player) => {
      if (team1.length < 5 && (team1Pts <= team2Pts || team2.length >= 5)) {
        team1.push(player);
        team1Pts += player.pts;
      } else if (team2.length < 5) {
        team2.push(player);
        team2Pts += player.pts;
      }
    });

    setTeams({
      team1,
      team1Pts,
      team2,
      team2Pts,
    });

    const spinner = document.createElement("div");
    spinner.className =
      "fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50";
    spinner.innerHTML = `
      <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-800 mb-4 bg-transparent"></div>
      <span class="text-white text-3xl text-yellow-300 bg-transparent">Generating...</span>
    `;
    const container = document.querySelector(".vlrt__container");
    container.appendChild(spinner);

    setTimeout(() => {
      spinner.remove();
      setIsModalOpen(true);
    }, 500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="vlrt__container mt-[100px] relative">
      {players.map((player, index) => (
        <PlayerVlrt
          className="players__list"
          key={player}
          playerNum={index + 1}
          selectedTier={playerData[index].tier}
          handlePlayerChange={handlePlayerChange}
        />
      ))}

      <div className="flex justify-center mt-4 bg-transparent">
        <button
          className="mt-[20px] w-[300px] text-[30px] flex items-center justify-center px-4 py-2 text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
          onClick={handleGenerateTeams}
        >
          Generate Fair Match!
        </button>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        teams={teams}
        onClose={handleCloseModal}
      />
    </div>
  );
}
