import React, { useState, useEffect, useCallback, useMemo } from "react";
import Spinner from "components/Spinner.jsx";
import WarningModal from "../components/WarningModal.jsx";
import PlayerLol from "components/PlayerLol.jsx";
import { tierToPoints_lol } from "../util/tierPoints.js";
import { generateLolTeams } from "../util/teamGenerator.js";
import ResultModalLol from "components/ResultModalLol.jsx";

const players = Array.from({ length: 10 }, (_, index) => `Player ${index + 1}`);

export default function Lol() {
  const [playerData, setPlayerData] = useState(() =>
    players.map(() => ({
      playerName: "",
      tier: "",
      pts: 0,
      selectedLanes: [],
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
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileRegex =
      /android|iphone|ipad|ipod|blackberry|windows phone|webos|opera mini|iemobile/;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  useEffect(() => {
    // 타이머 클린업
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  const handlePlayerChange = useCallback((index, field, value, checked) => {
    setPlayerData((prev) => {
      const updatedPlayers = [...prev];
      if (field === "selectedLanes") {
        const currentLanes = new Set(updatedPlayers[index].selectedLanes || []);
        checked ? currentLanes.add(value) : currentLanes.delete(value);
        updatedPlayers[index] = {
          ...updatedPlayers[index],
          selectedLanes: Array.from(currentLanes),
        };
      } else {
        updatedPlayers[index] = {
          ...updatedPlayers[index],
          [field]: value,
        };
        if (field === "tier") {
          updatedPlayers[index].pts = tierToPoints_lol[value] || 0;
        }
      }
      console.log(`Updated Player ${index + 1}:`, updatedPlayers[index]);
      return updatedPlayers;
    });
  }, []);

  const handleGenerateTeams = () => {
    console.log("Player Data Before Generating:", playerData);
    const isAnyFieldEmpty = playerData.some(
      (player) => !player.playerName || !player.tier,
    );

    if (isAnyFieldEmpty) {
      setIsWarningModalOpen(true);
    } else {
      handleGenerateSpinner(playerData);
    }

    console.log("Teams After Generating:", teams);
  };

  const handleGenerateSpinner = (players) => {
    setShowSpinner(true);
    const id = setTimeout(() => {
      const teams = generateLolTeams(players);
      setTeams(teams);
      setShowSpinner(false);
      setIsModalOpen(true);
    }, 500);
    setTimerId(id);
  };

  const handleContinueWithDefaults = () => {
    const updatedPlayers = playerData.map((player, index) => ({
      playerName: player.playerName || `Player ${index + 1}`,
      tier: player.tier || "Iron",
      pts: tierToPoints_lol[player.tier || "Iron"],
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

  const memoizedPlayerData = useMemo(() => playerData, [playerData]);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900 do-hyeon-regular">
        <h1 className="text-xl">GB는 모바일 기기에서 지원되지 않습니다.</h1>
      </div>
    );
  }

  return (
    <div className="page-container lol__container relative h-[100vh] flex-col items-center pt-[12vh]">
      <div className="flex h-[calc(100%-3.5rem)] flex-wrap items-center justify-center">
        {players.map((player, index) => (
          <PlayerLol
            key={player}
            playerNum={index + 1}
            playerData={memoizedPlayerData[index]}
            handlePlayerChange={(field, value, checked) =>
              handlePlayerChange(index, field, value, checked)
            }
          />
        ))}
      </div>

      <div className="mb-[1.3rem] mt-[0.4rem] flex justify-center bg-transparent">
        <button
          className="z-[10000] mt-[2vh] flex h-[3rem] w-[18rem] items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-[30px] text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 focus:ring-2 active:from-purple-800 active:to-indigo-800 active:outline-none active:ring-indigo-500 active:ring-offset-2"
          type="submit"
          onClick={handleGenerateTeams}
          disabled={showSpinner}
        >
          {showSpinner && <Spinner />}
          <span className={showSpinner ? "ml-2" : ""}>
            Generate Fair Match!
          </span>
        </button>
      </div>

      <ResultModalLol
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
