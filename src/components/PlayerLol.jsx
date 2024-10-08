import React, { useState } from "react";
import tierColors from "../styles/constants.json";
import topLaneImage from "../assets/lol_lane/top.svg";
import jungleLaneImage from "../assets/lol_lane/jungle.svg";
import midLaneImage from "../assets/lol_lane/mid.svg";
import adcLaneImage from "../assets/lol_lane/adc.svg";
import supportLaneImage from "../assets/lol_lane/support.svg";

export default function PlayerLol({
  playerNum,
  playerName,
  selectedTier,
  handlePlayerChange,
}) {
  const tiers = [
    { id: "Iron", label: "Iron", pts: 7 },
    { id: "Bronze", label: "Bronze", pts: 13 },
    { id: "Silver", label: "Silver", pts: 17 },
    { id: "Gold", label: "Gold", pts: 25 },
    { id: "Platinum", label: "Platinum", pts: 29 },
    { id: "Emerald", label: "Emerald", pts: 36 },
    { id: "Diamond", label: "Diamond", pts: 42 },
    { id: "Master", label: "Master", pts: 45 },
    { id: "GrandMaster", label: "GrandMaster", pts: 49 },
    { id: "Challenger", label: "Challenger", pts: 52 },
  ];

  const lanes = [
    { id: "top", label: "Top", image: topLaneImage },
    { id: "jungle", label: "Jungle", image: jungleLaneImage },
    { id: "mid", label: "Mid", image: midLaneImage },
    { id: "adc", label: "ADC", image: adcLaneImage },
    { id: "support", label: "Support", image: supportLaneImage },
  ];

  return (
    <div className="player">
      <section className="players">
        {/* Player Name Input */}
        <input
          type="text"
          className="players__input-name"
          value={playerName}
          onChange={(e) =>
            handlePlayerChange(playerNum - 1, "playerName", e.target.value)
          }
          placeholder={`Player ${playerNum} Name`}
          autoComplete="off"
        />
        {/* <div className="players__lanes">
          {lanes.map((lane) => (
            <div className="lane" key={lane.id}>
              <input
                id={`player${playerNum}-${lane.id}`}
                className="players__input-lane"
                name={`player${playerNum}-lane`}
                value={lane.id}
                type="checkbox"
                checked={selectedLanes.includes(lane.id)}
                onChange={handleLaneChange}
              />
              <img
                src={lane.image}
                alt={lane.label}
                className={`players__lane-image ${
                  selectedLanes.includes(lane.id) ? "selected" : ""
                }`}
              />
            </div>
          ))}
        </div> */}

        {tiers.map((tier) => (
          <div className="tier" key={tier.id}>
            <input
              id={`player${playerNum}-${tier.id}`}
              className="players__input-tier"
              name={`player${playerNum}`}
              value={tier.id}
              type="radio"
              checked={selectedTier === tier.id}
              onChange={() =>
                handlePlayerChange(playerNum - 1, "tier", tier.id)
              }
            />
            <label
              htmlFor={`player${playerNum}-${tier.id}`}
              className="players__tiers"
              style={{ color: tierColors.lol_color[tier.id] }}
            >
              {tier.label}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
}
