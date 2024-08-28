import React from "react";

export default function PlayerVlrt({ playerNum }) { // props를 디스트럭처링으로 받음
  return (
    <div>
      <section className="players">
        <input
          type="text"
          id={`playerName${playerNum}`}  // id에 playerNum 반영
          placeholder={`Player ${playerNum} Name`}  // placeholder에 playerNum 반영
          autoComplete="off"
        />

        <input 
          id={`player${playerNum}-bronze`} 
          name={`player${playerNum}`} 
          value="bronze" 
          type="radio" 
        />
        <label htmlFor={`player${playerNum}-bronze`} className="tier">
          Bronze
        </label>

        <input 
          id={`player${playerNum}-silver`} 
          name={`player${playerNum}`} 
          value="silver" 
          type="radio" 
        />
        <label htmlFor={`player${playerNum}-silver`} className="tier">
          Silver
        </label>

        <input 
          id={`player${playerNum}-gold`} 
          name={`player${playerNum}`} 
          value="gold" 
          type="radio" 
        />
        <label htmlFor={`player${playerNum}-gold`} className="tier">
          Gold
        </label>

        <input 
          id={`player${playerNum}-platinum`} 
          name={`player${playerNum}`} 
          value="platinum" 
          type="radio" 
        />
        <label htmlFor={`player${playerNum}-platinum`} className="tier">
          Platinum
        </label>

        <input 
          id={`player${playerNum}-diamond`} 
          name={`player${playerNum}`} 
          value="diamond" 
          type="radio" 
        />
        <label htmlFor={`player${playerNum}-diamond`} className="tier">
          Diamond
        </label>

        <input 
          id={`player${playerNum}-ascendant`} 
          name={`player${playerNum}`} 
          value="ascendant" 
          type="radio" 
        />
        <label htmlFor={`player${playerNum}-ascendant`} className="tier">
          Ascendant
        </label>

        <input 
          id={`player${playerNum}-immortal`} 
          name={`player${playerNum}`} 
          value="immortal" 
          type="radio" 
        />
        <label htmlFor={`player${playerNum}-immortal`} className="tier">
          Immortal
        </label>

        <input 
          id={`player${playerNum}-radiant`} 
          name={`player${playerNum}`} 
          value="radiant" 
          type="radio" 
        />
        <label htmlFor={`player${playerNum}-radiant`} className="tier">
          Radiant
        </label>
      </section>
    </div>
  );
}
