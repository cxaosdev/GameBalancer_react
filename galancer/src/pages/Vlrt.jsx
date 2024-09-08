/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import PlayerVlrt from 'components/PlayerVlrt.jsx';

const players = Array.from({ length: 10 }, (_, index) => `Player ${index + 1}`);

export default function Vlrt() {
  useEffect(() => {
    const tierColors = {
      Iron: '#5E5E5E',
      Bronze: '#8D6F46',
      Silver: '#BAC8D1',
      Gold: '#FFD700',
      Platinum: '#54D3E0',
      Diamond: '#A770F0',
      Ascendant: '#1CB952',
      Immortal: '#C23A73',
      Radiant: '#F3992E',
    };

    const labels = document.querySelectorAll('.players__tiers');

    labels.forEach((label) => {
      const tierText = label.textContent.trim();
      if (tierColors[tierText]) {
        label.style.color = tierColors[tierText];
      }
    });
  }, []);
  return (
    <div>
      {players.map((player, index) => (
        <PlayerVlrt key={index} playerNum={index + 1} />
      ))}
    </div>
  );
}
