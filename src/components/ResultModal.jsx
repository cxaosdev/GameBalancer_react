import React from "react";

export default function ResultModal({ isOpen, teams, onClose }) {
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal__overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-65 modal__overlay"
      onClick={handleClickOutside}
    >
      <div className="relative w-full max-w-4xl p-10 rounded-lg shadow-2xl bg-gradient-to-r from-purple-800 to-indigo-900">
        <button
          className="absolute text-white top-0 left-4 text-[40px] hover:text-yellow-300"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="grid grid-cols-1 gap-2 bg-transparent sm:grid-cols-2">
          {/* Team 1 */}
          <div className="p-6 text-white bg-transparent rounded-lg">
            <h2 className="text-4xl font-semibold text-center text-yellow-300 bg-transparent">
              Team 1
            </h2>
            <h2 className="mb-6 text-2xl font-semibold text-center text-yellow-300 bg-transparent">
              [ Total Points: {teams.team1Pts} ]
            </h2>
            <ul className="space-y-4 bg-transparent ">
              {teams.team1.map((player, index) => (
                <li
                  key={index}
                  className="flex justify-between p-3 bg-opacity-50 rounded-lg shadow-md bg-zinc-900"
                >
                  <span className="text-2xl bg-transparent do-hyeon-regular">
                    {player.playerName}
                  </span>
                  <span className="text-xl bg-transparent">{player.tier}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team 2 */}
          <div className="p-6 text-white bg-transparent rounded-lg ">
            <h2 className="text-4xl font-semibold text-center text-yellow-300 bg-transparent">
              Team 2
            </h2>
            <h2 className="mb-6 text-2xl font-semibold text-center text-yellow-300 bg-transparent">
              [ Total Points: {teams.team1Pts} ]
            </h2>
            <ul className="space-y-4 bg-transparent ">
              {teams.team2.map((player, index) => (
                <li
                  key={index}
                  className="flex justify-between p-3 bg-opacity-50 rounded-lg shadow-md bg-zinc-900"
                >
                  <span className="text-2xl bg-transparent do-hyeon-regular">
                    {player.playerName}
                  </span>
                  <span className="text-xl bg-transparent">{player.tier}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Point Difference */}
          <div className="col-span-2 text-center bg-transparent">
            <h2 className="mb-5 text-4xl font-bold text-yellow-300 bg-transparent">
              Point Difference: {Math.abs(teams.team1Pts - teams.team2Pts)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
