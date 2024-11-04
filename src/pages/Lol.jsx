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
  const [showSpinner, setShowSpinner] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      selectedLanes: player.selectedLanes.length
        ? player.selectedLanes
        : ["Top", "Jungle", "Mid", "ADC", "Support"],
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

  return (
    <div className="page-container lol__container relative flex flex-col items-center overflow-y-auto pt-[9vh]">
      <div className="mb-[8vh] mt-[3vh] flex flex-wrap items-center justify-center">
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

      <div className="z-[10000] mb-[1.3rem] mt-[0.4rem] flex justify-center bg-transparent">
        <button
          className="sparkle fixed bottom-[4.5vh] mt-[2vh] flex h-[6vh] items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-[30px] text-white shadow-2xl shadow-indigo-900/50 hover:from-purple-700 hover:to-indigo-700 hover:shadow-indigo-900/70 focus:ring-2 active:from-purple-800 active:to-indigo-800 active:outline-none active:ring-indigo-500 active:ring-offset-2"
          style={{
            boxShadow:
              "0px 0px 20px rgba(255, 255, 255, 0.7), 4px 4px 40px rgba(0, 0, 0, 0.2)",
          }}
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

      <style jsx>{`
        @keyframes sparkle {
          0%,
          100% {
            box-shadow:
              0px 0px 10px rgba(255, 255, 255, 0.7),
              4px 4px 10px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow:
              0px 0px 20px rgba(255, 255, 255, 1),
              4px 4px 20px rgba(0, 0, 0, 0.3);
          }
        }

        .sparkle {
          animation: sparkle 1.5s infinite alternate;
        }
      `}</style>

      <div className="fixed right-[20px] top-1/2 mt-6 flex -translate-y-1/2 transform flex-col items-center">
        <button
          className="flex flex-col items-center cursor-pointer"
          onClick={scrollToBottom}
        >
          <span
            className="do-hyeon-regular mb-2 transform animate-pulse whitespace-nowrap text-[3vh] text-white"
            style={{ writingMode: "vertical-rl" }}
          >
            If you're done, "Generate Fair Game" 〉
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
