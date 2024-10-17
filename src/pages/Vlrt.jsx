import React, { useState, useEffect, useCallback } from "react";
import PlayerVlrt from "components/PlayerVlrt.jsx";
import ResultModal from "components/ResultModal.jsx";
import Spinner from "components/Spinner.jsx";
import WarningModal from "../components/WarningModal.jsx";
import { generateTeamsAlgorithm } from "../util/teamGenerator.js";
import { tierToPoints } from "../util/tierPoints.js";

const players = Array.from({ length: 10 }, (_, index) => `Player ${index + 1}`);

export default function Vlrt() {
  const [playerData, setPlayerData] = useState(
    players.map((_, index) => ({
      playerName: "",
      tier: "",
      pts: 0,
    })),
  );

  const [teams, setTeams] = useState({
    team1: [],
    team1Pts: 0,
    team2: [],
    team2Pts: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

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

  const handleGenerateSpinner = (players) => {
    setShowSpinner(true);
    setTimeout(() => {
      const teams = generateTeamsAlgorithm(players);
      setTeams(teams);
      setShowSpinner(false);
      setIsModalOpen(true);
    }, 500);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseWarningModal = () => {
    setIsWarningModalOpen(false);
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <h1 className="text-3xl">GB는 모바일 기기에서 지원되지 않습니다.</h1>
      </div>
    );
  }

  return (
    <div className="vlrt__container relative pt-[12vh]">
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

      <div className="mb-[10px] mt-[1rem] flex justify-center bg-transparent">
        <button
          className="flex w-[18rem] justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-[30px] text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 focus:from-white focus:to-indigo-400 focus:text-indigo-600"
          type="submit"
          onClick={handleGenerateTeams}
          disabled={showSpinner}
        >
          {showSpinner ? <Spinner /> : "Generate Fair Match!"}
        </button>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        teams={teams}
        onClose={handleCloseModal}
      />

      {isWarningModalOpen && (
        <WarningModal
          onClose={handleCloseWarningModal}
          onContinue={handleContinueWithDefaults}
        />
      )}
    </div>
  );
}
