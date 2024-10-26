import React, { useState, memo, useEffect } from "react";
import tierColors from "../styles/constants.json";

const PlayerVlrt = memo(
  ({ playerNum, playerName, selectedTier, handlePlayerChange }) => {
    console.log(`rendered player ${playerNum}`);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isSmallerView, setIsSmallerView] = useState(
      window.innerWidth <= 1024,
    );
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

    useEffect(() => {
      const handleResize = () => {
        setIsSmallerView(window.innerWidth <= 1024);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    return (
      <div className="player">
        <section className="players flex justify-center">
          <input
            type="text"
            className="players__input-name text-[2.5vh]"
            value={playerName}
            onChange={(e) => handlePlayerChange("playerName", e.target.value)}
            placeholder={`Player ${playerNum} Name`}
            autoComplete="off"
          />
          <div className="ml-[2.5vw] flex items-center justify-between gap-[1.8vw]">
            {isSmallerView ? (
              <div className="tier-selection flex flex-col">
                <div
                  className="tier-dropdown w-[15vh] cursor-pointer rounded-md bg-white text-center text-[2.3vh]"
                  onClick={toggleDropdown}
                >
                  <span
                    className="selected-tier text-[3vh]"
                    style={{
                      color: selectedTier
                        ? tierColors.vlrt_color[selectedTier]
                        : "gray",
                    }}
                  >
                    {selectedTier || "Select Tier"}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="tier-dropdown-menu absolute flex flex-wrap rounded-md bg-white">
                    {tiers.map((tier) => (
                      <div
                        className="tier-option cursor-pointer px-[0.5em] text-center text-[3vh]"
                        key={tier.id}
                        onClick={() => {
                          handlePlayerChange("tier", tier.id);
                          setDropdownOpen(false);
                        }}
                      >
                        <span style={{ color: tierColors.vlrt_color[tier.id] }}>
                          {tier.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              tiers.map((tier) => (
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
                    className="players__tiers flex items-center text-center text-[3.5vh]"
                    style={{ color: tierColors.vlrt_color[tier.id] }}
                  >
                    {tier.label}
                  </label>
                </div>
              ))
            )}
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
