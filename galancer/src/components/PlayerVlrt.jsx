import React from 'react';

export default function PlayerVlrt({ playerNum }) {
  const tiers = [
    { id: 'bronze', label: 'Bronze' },
    { id: 'silver', label: 'Silver' },
    { id: 'gold', label: 'Gold' },
    { id: 'platinum', label: 'Platinum' },
    { id: 'diamond', label: 'Diamond' },
    { id: 'ascendant', label: 'Ascendant' },
    { id: 'immortal', label: 'Immortal' },
    { id: 'radiant', label: 'Radiant' },
  ];

  return (
    <div>
      <section className='players'>
        <input
          type='text'
          className = 'players__input-name'
          id={`playerName${playerNum}`}
          placeholder={`Player ${playerNum} Name`}
          autoComplete='off'
        />

        {tiers.map((tier, index) => (
          <div key={tier.id}>
            <input
              id={`player${playerNum}-${tier.id}`}
              className='players__input-tier'
              name={`player${playerNum}`}
              value={tier.id}
              type='radio'
              defaultChecked={index === 0}
            />
            <label htmlFor={`player${playerNum}-${tier.id}`} className='players__tiers'>
              {tier.label}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
}
