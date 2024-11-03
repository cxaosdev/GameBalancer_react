import React from "react";
import { FaClipboard } from "react-icons/fa";

export default function ResultModalLol({ isOpen, teams, onClose }) {
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal__overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const positionNames = {
    top: "Top lane",
    jungle: "Jungle",
    mid: "Mid lane",
    adc: "ADC",
    support: "Support",
  };

  const notEnoughPositions = [
    ...(teams.missingPositions || []),
    ...(teams.insufficientPositions || []),
  ];

  const generateResultText = () => {
    const team1Text = teams.team1
      .map(
        (player) =>
          `${positionNames[player.selectedLanes[0]]}: ${player.playerName} (${player.tier})`,
      )
      .join("\n");
    const team2Text = teams.team2
      .map(
        (player) =>
          `${positionNames[player.selectedLanes[0]]}: ${player.playerName} (${player.tier})`,
      )
      .join("\n");

    return `Team 1 [Total Points: ${teams.team1Pts}]:\n${team1Text}\n\nTeam 2 [Total Points: ${teams.team2Pts}]:\n${team2Text}\n\nPoint Difference: ${Math.abs(
      teams.team1Pts - teams.team2Pts,
    )}`;
  };

  const copyToClipboard = () => {
    const resultText = generateResultText();
    navigator.clipboard.writeText(resultText).then(() => {
      alert("copied results!");
    });
  };

  return (
    <div
      className="modal__overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-65"
      onClick={handleClickOutside}
    >
      <div className="relative w-full max-w-4xl rounded-lg bg-gradient-to-r from-purple-800 to-indigo-900 p-10 shadow-2xl">
        <button
          className="absolute right-4 top-0 text-[40px] text-white hover:text-yellow-300"
          onClick={onClose}
        >
          &times;
        </button>

        {notEnoughPositions.length > 0 ? (
          <div className="text-center">
            <h2 className="bg-transparent text-4xl font-bold">
              <span className="text-white">⚠️ Need more players for</span>{" "}
              {notEnoughPositions
                .map((pos) => (
                  <span key={pos} className="text-indigo-500">
                    {positionNames[pos]}
                  </span>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])}
              &nbsp;⚠️
            </h2>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 bg-transparent sm:grid-cols-2">
              {/* Team 1 */}
              <div className="rounded-lg bg-transparent p-6 text-white">
                <h2 className="bg-transparent text-center text-4xl font-semibold text-yellow-300">
                  Team 1
                </h2>
                <h2 className="mb-6 bg-transparent text-center text-2xl font-semibold text-yellow-300">
                  [ Total Points: {teams.team1Pts} ]
                </h2>
                <ul className="space-y-4 bg-transparent">
                  {teams.team1.map((player, index) => (
                    <li
                      key={index}
                      className="flex justify-between rounded-lg bg-zinc-900 bg-opacity-50 p-3 shadow-md"
                    >
                      <span className="do-hyeon-regular bg-transparent text-2xl text-white">
                        {positionNames[player.selectedLanes[0]]}:{" "}
                        {player.playerName}
                      </span>
                      <span className="bg-transparent text-xl text-white">
                        {player.tier}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team 2 */}
              <div className="rounded-lg bg-transparent p-6 text-white">
                <h2 className="bg-transparent text-center text-4xl font-semibold text-yellow-300">
                  Team 2
                </h2>
                <h2 className="mb-6 bg-transparent text-center text-2xl font-semibold text-yellow-300">
                  [ Total Points: {teams.team2Pts} ]
                </h2>
                <ul className="space-y-4 bg-transparent">
                  {teams.team2.map((player, index) => (
                    <li
                      key={index}
                      className="flex justify-between rounded-lg bg-zinc-900 bg-opacity-50 p-3 shadow-md"
                    >
                      <span className="do-hyeon-regular bg-transparent text-2xl text-white">
                        {positionNames[player.selectedLanes[0]]}:{" "}
                        {player.playerName}
                      </span>
                      <span className="bg-transparent text-xl text-white">
                        {player.tier}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 bg-transparent text-center">
                <h2 className="mb-5 bg-transparent text-4xl font-bold text-yellow-300">
                  Point Difference: {Math.abs(teams.team1Pts - teams.team2Pts)}
                </h2>
              </div>
            </div>
          </>
        )}

        <div className="mt-1 flex justify-center">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-xl text-white hover:text-yellow-300"
          >
            <FaClipboard className="text-2xl" />
            <span>copy results</span>
          </button>
        </div>
      </div>
    </div>
  );
}
