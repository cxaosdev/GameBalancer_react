import React from "react";

export default function PlayerLol({ playerNum }) {
  const tiers = [
    { id: "iron", label: "Iron" },
    { id: "bronze", label: "Bronze" },
    { id: "silver", label: "Silver" },
    { id: "gold", label: "Gold" },
    { id: "platinum", label: "Platinum" },
    { id: "emerald", label: "Emerald" },
    { id: "diamond", label: "Diamond" },
    { id: "master", label: "Master" },
    { id: "grandmaster", label: "GrandMaster" },
    { id: "challenger", label: "Challenger" },
  ];

  return (
    <div className='player'>
      <section className='players'>
        <input
          type='text'
          className='players__input-name'
          id={`playerName${playerNum}`}
          placeholder={`Player ${playerNum} Name`}
          autoComplete='off'
        />

        {tiers.map((tier, index) => (
          <div className='tier' key={tier.id}>
            <input
              id={`player${playerNum}-${tier.id}`}
              className='players__input-tier'
              name={`player${playerNum}`}
              value={tier.id}
              type='radio'
              defaultChecked={index === 0}
            />
            <label
              htmlFor={`player${playerNum}-${tier.id}`}
              className='players__tiers'
            >
              {tier.label}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
}
