import React, { useEffect } from 'react';

export default function Lol() {
  useEffect(() => {
    const tierColors = {
      "Iron": "#A3A3A3",
      "Bronze": "#CD7F32",
      "Silver": "#C0C0C0",
      "Gold": "#FFD700",
      "Platinum": "#00A2E8",
      "Emerald": "#50C878",
      "Diamond": "#B9F2FF",
      "Master": "#FF33FF",
      "GrandMaster": "#FF6666",
      "Challenger": "#00FFFF"
    };

    const labels = document.querySelectorAll('.teer');

    labels.forEach(label => {
      const tierText = label.textContent.trim();
      if (tierColors[tierText]) {
        label.style.color = tierColors[tierText];
      }
    });
  }, []); 

  return (
    <div>
      <section className="players">
        <input type="text" id="playerName1" placeholder="Player 1 Name" autoComplete="off" />

        <input id="player1-iron" name="player1" value="iron" type="radio" defaultChecked />
        <label htmlFor="player1-iron" className="teer">Iron</label>

        <input id="player1-bronze" name="player1" value="bronze" type="radio" />
        <label htmlFor="player1-bronze" className="teer">Bronze</label>

        <input id="player1-silver" name="player1" value="silver" type="radio" />
        <label htmlFor="player1-silver" className="teer">Silver</label>

        <input id="player1-gold" name="player1" value="gold" type="radio" />
        <label htmlFor="player1-gold" className="teer">Gold</label>

        <input id="player1-platinum" name="player1" value="platinum" type="radio" />
        <label htmlFor="player1-platinum" className="teer">Platinum</label>

        <input id="player1-emerald" name="player1" value="emerald" type="radio" />
        <label htmlFor="player1-emerald" className="teer">Emerald</label>

        <input id="player1-diamond" name="player1" value="diamond" type="radio" />
        <label htmlFor="player1-diamond" className="teer">Diamond</label>

        <input id="player1-master" name="player1" value="master" type="radio" />
        <label htmlFor="player1-master" className="teer">Master</label>

        <input id="player1-grandmaster" name="player1" value="grandmaster" type="radio" />
        <label htmlFor="player1-grandmaster" className="teer">GrandMaster</label>

        <input id="player1-challenger" name="player1" value="challenger" type="radio" />
        <label htmlFor="player1-challenger" className="teer">Challenger</label>
      </section>
    </div>
  );
}
