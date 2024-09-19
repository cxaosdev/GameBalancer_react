import React, { useState } from "react";

import topLaneImage from "assets/lol_lane/top.svg";
import jungleLaneImage from "assets/lol_lane/jungle.svg";
import midLaneImage from "assets/lol_lane/mid.svg";
import adcLaneImage from "assets/lol_lane/adc.svg";
import supportLaneImage from "assets/lol_lane/support.svg";

export default function PlayerLol({ playerNum, updatePlayerInfo }) {
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

  const lanes = [
    { id: "top", label: "Top", image: topLaneImage },
    { id: "jungle", label: "Jungle", image: jungleLaneImage },
    { id: "mid", label: "Mid", image: midLaneImage },
    { id: "adc", label: "ADC", image: adcLaneImage },
    { id: "support", label: "Support", image: supportLaneImage },
  ];

  const [playerName, setPlayerName] = useState("");
  const [selectedTier, setSelectedTier] = useState(tiers[0].id);
  const [selectedLanes, setSelectedLanes] = useState([]);

  const handleUpdate = () => {
    updatePlayerInfo(playerNum, {
      name: playerName,
      tier: selectedTier,
      lanes: selectedLanes,
    });
  };

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
    handleUpdate();
  };

  const handleTierChange = (e) => {
    setSelectedTier(e.target.value);
    handleUpdate();
  };

  const handleLaneChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLanes((prev) => [...prev, value]);
    } else {
      setSelectedLanes((prev) => prev.filter((lane) => lane !== value));
    }
    handleUpdate();
  };

  return (
    <div className='player'>
      <section className='players'>
        {/* input player's name */}
        <input
          type='text'
          className='players__input-name'
          id={`playerName${playerNum}`}
          placeholder={`Player ${playerNum} Name`}
          value={playerName}
          onChange={handleNameChange}
          autoComplete='off'
        />
        {/* input player's lane */}
        <div className='players__lanes'>
          {lanes.map((lane) => (
            <div className='lane' key={lane.id}>
              <input
                id={`player${playerNum}-${lane.id}`}
                className='players__input-lane'
                name={`player${playerNum}-lane`}
                value={lane.id}
                type='checkbox'
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
        </div>
        {/* input player's tier */}
        {tiers.map((tier, index) => (
          <div className='tier' key={tier.id}>
            <input
              id={`player${playerNum}-${tier.id}`}
              className='players__input-tier'
              name={`player${playerNum}`}
              value={tier.id}
              type='radio'
              checked={selectedTier === tier.id}
              defaultChecked={index === 0}
              onChange={handleTierChange}
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
