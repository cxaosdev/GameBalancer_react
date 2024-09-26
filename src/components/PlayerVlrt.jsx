import React from "react";

export default function PlayerVlrt({ playerNum }) {
  const tiers = [
    { id: "iron", label: "Iron", pts: 7 },
    { id: "bronze", label: "Bronze", pts: 13 },
    { id: "silver", label: "Silver", pts: 17 },
    { id: "gold", label: "Gold", pts: 25 },
    { id: "platinum", label: "Platinum", pts: 29 },
    { id: "diamond", label: "Diamond", pts: 37 },
    { id: "ascendant", label: "Ascendant", pts: 43 },
    { id: "immortal", label: "Immortal", pts: 45 },
    { id: "radiant", label: "Radiant", pts: 48 },
  ];

  return (
    <div className="player">
      <section className="players">
        <input
          type="text"
          className="players__input-name"
          id={`playerName${playerNum}`}
          placeholder={`Player ${playerNum} Name`}
          autoComplete="off"
        />

        {tiers.map((tier, index) => (
          <div className="tier" key={tier.id}>
            <input
              id={`player${playerNum}-${tier.id}`}
              className="players__input-tier"
              name={`player${playerNum}`}
              value={tier.id}
              type="radio"
              defaultChecked={index === 0}
            />
            <label
              htmlFor={`player${playerNum}-${tier.id}`}
              className="players__tiers"
            >
              {tier.label}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
}
