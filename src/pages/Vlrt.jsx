import React, { useState, useEffect, useCallback } from "react";
import PlayerVlrt from "components/PlayerVlrt.jsx";
import ResultModal from "components/ResultModal.jsx";

const players = Array.from({ length: 10 }, (_, index) => `Player ${index + 1}`);

export default function Vlrt() {
  const [playerData, setPlayerData] = useState(
    players.map((_, index) => ({
      playerName: "",
      tier: "",
      pts: 0,
    })),
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
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileRegex =
      /android|iphone|ipad|ipod|blackberry|windows phone|webos|opera mini|iemobile/;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  const handlePlayerChange = useCallback(({ index, field, value }) => {
    setPlayerData((prev) => {
      const updatedPlayers = [...prev];
      updatedPlayers[index][field] = value;
      if (field === "tier") {
        updatedPlayers[index].pts = tierToPoints[value] || 0;
      }
      return updatedPlayers;
    });
  }, []);

  const handleGenerateSpinner = (players) => {
    const spinner = document.createElement("div");
    spinner.className =
      "fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50";
    spinner.innerHTML = `
      <div class="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 bg-transparent border-purple-800 mb-4"></div>
      <span class="text-white text-3xl text-yellow-300">Generating...</span>
    `;
    const container = document.querySelector(".vlrt__container");
    container.appendChild(spinner);

    setTimeout(() => {
      spinner.remove();
      generateTeams(players);
    }, 500);
  };

  const handleGenerateTeams = () => {
    const isAnyFieldEmpty = playerData.some(
      (player) => !player.playerName || !player.tier,
    );

    if (isAnyFieldEmpty) {
      setIsWarningModalOpen(true);
    } else {
      handleGenerateSpinner(playerData);
    }
  };

  const handleContinueWithDefaults = () => {
    const updatedPlayers = playerData.map((player, index) => ({
      playerName: player.playerName || `Player ${index + 1}`,
      tier: player.tier || "Iron",
      pts: tierToPoints[player.tier || "Iron"],
    }));

    setPlayerData(updatedPlayers);
    setIsWarningModalOpen(false);
    handleGenerateSpinner(updatedPlayers);
  };

  const generateTeams = (players) => {
    const sortedPlayers = [...players].sort((a, b) => b.pts - a.pts);
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

    setTeams({ team1, team1Pts, team2, team2Pts });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseWarningModal = () => {
    setIsWarningModalOpen(false);
  };

  if (isMobile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl">GB는 모바일 기기에서 지원되지 않습니다.</h1>
      </div>
    );
  }

  return (
    <div className="vlrt__container relative mt-[100px]">
      {players.map((player, index) => (
        <PlayerVlrt
          key={player}
          playerNum={index + 1}
          playerName={playerData[index].playerName}
          selectedTier={playerData[index].tier}
          handlePlayerChange={(field, value) =>
            handlePlayerChange({ index, field, value })
          }
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

      {isWarningModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-md p-10 text-center">
            <h2 className="do-hyeon-regular mb-10 text-4xl">
              Please fill out all fields.
            </h2>
            <div className="flex justify-center gap-5">
              <button
                onClick={handleContinueWithDefaults}
                className="do-hyeon-regular rounded-md bg-red-500 px-7 py-3 text-2xl text-white"
              >
                Generate anyway
              </button>
              <button
                onClick={handleCloseWarningModal}
                className="do-hyeon-regular rounded-md bg-green-500 px-7 py-3 text-2xl text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
