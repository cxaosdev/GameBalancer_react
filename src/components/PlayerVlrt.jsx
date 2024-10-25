import React, { memo } from "react";
import tierColors from "../styles/constants.json";

const PlayerVlrt = memo(
  ({ playerNum, playerName, selectedTier, handlePlayerChange }) => {
    console.log(`rendered player ${playerNum}`);
    const tiers = [
      { id: "Iron", label: "Iron", pts: 7 },
      { id: "Bronze", label: "Bronze", pts: 13 },
      { id: "Silver", label: "Silver", pts: 17 },
      { id: "Gold", label: "Gold", pts: 25 },
      { id: "Platinum", label: "Platinum", pts: 29 },
      { id: "Diamond", label: "Diamond", pts: 37 },
      { id: "Ascendant", label: "Ascendant", pts: 43 },
      { id: "Immortal", label: "Immortal", pts: 45 },
      { id: "Radiant", label: "Radiant", pts: 48 },
    ];

    return (
      <div className="player">
        <section className="flex justify-center players">
          <input
            type="text"
            className="players__input-name text-[1.1vw]"
            value={playerName}
            onChange={(e) => handlePlayerChange("playerName", e.target.value)}
            placeholder={`Player ${playerNum} Name`}
            autoComplete="off"
          />
          <div className="ml-[2.5vw] flex items-center justify-between gap-[1.8vw]">
            {tiers.map((tier) => (
              <div className="tier" key={tier.id}>
                <input
                  id={`player${playerNum}-${tier.id}`}
                  className="players__input-tier"
                  name={`player${playerNum}`}
                  value={tier.id}
                  type="radio"
                  checked={selectedTier === tier.id}
                  onChange={(e) => handlePlayerChange("tier", e.target.value)}
                />
                <label
                  htmlFor={`player${playerNum}-${tier.id}`}
                  className="players__tiers flex items-center text-center text-[1.8vw]"
                  style={{ color: tierColors.vlrt_color[tier.id] }}
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

export default PlayerVlrt;
