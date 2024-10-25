import topLaneImage from "../assets/lol_lane/top.svg";
import jungleLaneImage from "../assets/lol_lane/jungle.svg";
import midLaneImage from "../assets/lol_lane/mid.svg";
import adcLaneImage from "../assets/lol_lane/adc.svg";
import supportLaneImage from "../assets/lol_lane/support.svg";
import React, { memo } from "react";
import tierColors from "../styles/constants.json";

const PlayerLol = memo(
  ({ playerNum, playerName, selectedTier, handlePlayerChange }) => {
    console.log(`rendered player ${playerNum} `);

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
        <section className="flex justify-center players">
          <input
            type="text"
            className="players__input-name w-[8vw] text-[1.1vw]"
            value={playerName}
            onChange={(e) => handlePlayerChange("playerName", e.target.value)}
            placeholder={`Player ${playerNum} Name`}
            autoComplete="off"
          />

          <div className="ml-[1vw] flex items-center justify-between gap-[5px]">
            {lanes.map((lane) => (
              <div
                className="flex items-center justify-between lane"
                key={lane.id}
              >
                <input
                  id={`player${playerNum}-${lane.id}`}
                  className="players__input-lane"
                  name={`player${playerNum}-lane`}
                  type="checkbox"
                />
                <label
                  htmlFor={`player${playerNum}-${lane.id}`}
                  className="flex items-center rounded-sm players__lanes opacity-90"
                >
                  <img
                    src={lane.image}
                    alt={lane.label}
                    className="lane__image w-[1.9vw] opacity-100"
                  />
                </label>
              </div>
            ))}
          </div>

          <div className="ml-[1vw] flex items-center justify-between">
            {tiers.map((tier) => (
              <div className="tier" key={tier.id}>
                <input
                  id={`player${playerNum}-${tier.id}`}
                  className="players__input-tier"
                  name={`player${playerNum}-tier`}
                  value={tier.id}
                  type="radio"
                  checked={selectedTier === tier.id}
                  onChange={(e) => handlePlayerChange("tier", e.target.value)}
                />
                <label
                  htmlFor={`player${playerNum}-${tier.id}`}
                  className="players__tiers flex items-center text-center text-[1.8vw]"
                  style={{ color: tierColors.lol_color[tier.id] }}
                >
                  {tier.label}
                </label>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.playerName === nextProps.playerName &&
    prevProps.selectedTier === nextProps.selectedTier,
);

export default PlayerLol;
