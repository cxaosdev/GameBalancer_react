/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import PlayerVlrt from "components/PlayerVlrt.jsx";

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

  const handlePlayerChange = (index, field, value) => {
    console.log(
      `Change detected for player ${index + 1}: ${field} -> ${value}`
    ); // Log the change
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

    console.log("Team 1:", team1);
    console.log("Team 2:", team2);
    setTeams({
      team1,
      team1Pts,
      team2,
      team2Pts,
    });
  };

  const [teams, setTeams] = useState({
    team1: [],
    team1Pts: 0,
    team2: [],
    team2Pts: 0,
  });

  return (
    <div className="vlrt__container mt-[100px]">
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
          className="w-[300px] text-[30px] flex items-center justify-center px-4 py-2 text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
          onClick={handleGenerateTeams}
        >
          Generate Fair Match!
        </button>
      </div>

      {teams.team1.length > 0 && (
        <div className="grid grid-cols-1 gap-6 mt-8 bg-white sm:grid-cols-2 ">
          {/* Team 1 */}
          <div className="p-6 mt-4 ml-6 text-black rounded-lg shadow-lg">
            <h2 className="mb-10 text-xl font-semibold text-center  text-[51px]">
              Team 1 ( Total Points: {teams.team1Pts} ) :
            </h2>
            <ul className="space-y-2">
              {teams.team1.map((player, index) => (
                <li
                  key={index}
                  className="flex justify-between p-2 rounded-lg bg-gray"
                >
                  <span className="text-[25px]">{player.playerName}</span>
                  <span className="text-[25px]">
                    {player.tier} ({player.pts} pts)
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team 2 */}
          <div className="p-6 mt-4 mr-6 text-white rounded-lg shadow-lg bg-gray">
            <h2 className="mb-10  text-xl font-semibold text-center  text-[51px]">
              Team 2 ( Total Points: {teams.team2Pts} ) :
            </h2>
            <ul className="space-y-2">
              {teams.team2.map((player, index) => (
                <li
                  key={index}
                  className="flex justify-between p-2 rounded-lg bg-gray"
                >
                  <span className="text-[25px]">{player.playerName}</span>
                  <span className="text-[25px]">
                    {player.tier} ({player.pts} pts)
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Point Difference */}
          <div className="col-span-2 text-center">
            <h2 className="mt-3 text-2xl font-bold text-gray-300 mb-[30px]">
              Point Difference: {Math.abs(teams.team1Pts - teams.team2Pts)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
