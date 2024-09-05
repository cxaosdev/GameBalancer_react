import React from "react";

export default function PlayerLol({ playerNum }) {
  return (
    <div>
      <section className="players">
        <input
          type="text"
          id={`playerName${playerNum}`}
          placeholder={`Player ${playerNum} Name`}
          autoComplete="off"
        />

        <input
          id={`player${playerNum}-iron`}
          name={`player${playerNum}`}
          value="iron"
          type="radio"
          defaultChecked
        />
        <label htmlFor={`player${playerNum}-iron`} className="tier">
          Iron
        </label>

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
          id={`player${playerNum}-emerald`}
          name={`player${playerNum}`}
          value="emerald"
          type="radio"
        />
        <label htmlFor={`player${playerNum}-emerald`} className="tier">
          Emerald
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
          id={`player${playerNum}-master`}
          name={`player${playerNum}`}
          value="master"
          type="radio"
        />
        <label htmlFor={`player${playerNum}-master`} className="tier">
          Master
        </label>

        <input
          id={`player${playerNum}-grandmaster`}
          name={`player${playerNum}`}
          value="grandmaster"
          type="radio"
        />
        <label htmlFor={`player${playerNum}-grandmaster`} className="tier">
          GrandMaster
        </label>

        <input
          id={`player${playerNum}-challenger`}
          name={`player${playerNum}`}
          value="challenger"
          type="radio"
        />
        <label htmlFor={`player${playerNum}-challenger`} className="tier">
          Challenger
        </label>
      </section>
    </div>
  );
}
