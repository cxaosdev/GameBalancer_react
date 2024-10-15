import React, { useState } from "react";
import Playerlol from "components/PlayerLol.jsx";
import ResultModal from "components/ResultModal.jsx";

const players = Array.from({ length: 10 }, (_, index) => `Player ${index + 1}`);
export default function Lol() {
  const [playerData, setPlayerData] = useState(
    players.map((_, index) => ({
      playerName: `Player ${index + 1}`,
      tier: "Iron",
      pts: 7,
    })),
  );

  const tierToPoints = {
    Iron: 7,
    Bronze: 13,
    Silver: 17,
    Gold: 25,
    Platinum: 32,
    Emerald: 40,
    Diamond: 48,
    Master: 54,
    GrandMaster: 59,
    Challenger: 64,
  };

  const handlePlayerChange = (index, field, value) => {
    console.log(
      `Change detected for player ${index + 1}: ${field} -> ${value}`,
    );
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

    setIsModalOpen(true);
  };

  const [teams, setTeams] = useState({
    team1: [],
    team1Pts: 0,
    team2: [],
    team2Pts: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="lol__container mt-[100px]">
        {players.map((player, index) => (
          <Playerlol
            className="players__list"
            key={player}
            playerNum={index + 1}
            selectedTier={playerData[index].tier}
            handlePlayerChange={handlePlayerChange}
          />
        ))}

        <div className="mt-4 flex justify-center bg-transparent">
          <button
            className="mt-[20px] flex w-[300px] items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-[30px] text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
    </>
  );
}
