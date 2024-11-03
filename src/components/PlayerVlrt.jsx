import React, { useState, memo, useEffect } from "react";
import tierColors from "../styles/constants.json";

const PlayerVlrt = memo(
  ({ playerNum, playerName, selectedTier, handlePlayerChange }) => {
    console.log(`rendered player ${playerNum}`);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isLgView, setIsLgView] = useState(window.innerWidth <= 1200);
    const [isSmView, setIsSmView] = useState(window.innerWidth <= 768);

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
        setIsLgView(window.innerWidth <= 1200);
        setIsSmView(window.innerWidth <= 768);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    return (
      <div className="player mt-[0.5vh] flex justify-center">
        <section className="players flex items-center justify-between">
          <input
            type="text"
            className="players__input-name w-[7em] text-[1.3em]"
            value={playerName}
            onChange={(e) => handlePlayerChange("playerName", e.target.value)}
            placeholder={`Player ${playerNum} Name`}
            autoComplete="off"
          />
          <div
            className={`ml-[1vw] flex items-center justify-center gap-[0.4em] ${
              isSmView ? "w-[15em]" : isLgView ? "w-[45em]" : "w-[70em]"
            }`}
          >
            {isSmView ? (
              <div className="tier-selection flex h-[100%] flex-col">
                <div
                  className="tier-dropdown w-[15vh] cursor-pointer rounded-md bg-white text-center text-[2.3vh]"
                  onClick={toggleDropdown}
                >
                  <span
                    className="selected-tier m-0 p-0 text-[3vh]"
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
            ) : isLgView ? (
              <div className="ml-3 mt-3 flex-col">
                <div className="flex justify-start">
                  {tiers.slice(0, 5).map((tier) => (
                    <div className="tier" key={tier.id}>
                      <input
                        id={`player${playerNum}-${tier.id}`}
                        className="players__input-tier"
                        name={`player${playerNum}-tier`}
                        value={tier.id}
                        type="radio"
                        checked={selectedTier === tier.id}
                        onChange={(e) =>
                          handlePlayerChange("tier", e.target.value)
                        }
                      />
                      <label
                        htmlFor={`player${playerNum}-${tier.id}`}
                        className="players__tiers flex items-center text-center text-[3.5vh]"
                        style={{ color: tierColors.vlrt_color[tier.id] }}
                      >
                        {tier.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-start">
                  {tiers.slice(5).map((tier) => (
                    <div className="tier" key={tier.id}>
                      <input
                        id={`player${playerNum}-${tier.id}`}
                        className="players__input-tier"
                        name={`player${playerNum}-tier`}
                        value={tier.id}
                        type="radio"
                        checked={selectedTier === tier.id}
                        onChange={(e) =>
                          handlePlayerChange("tier", e.target.value)
                        }
                      />
                      <label
                        htmlFor={`player${playerNum}-${tier.id}`}
                        className="players__tiers flex items-center text-center text-[3.5vh]"
                        style={{ color: tierColors.vlrt_color[tier.id] }}
                      >
                        {tier.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              tiers.map((tier) => (
                <div className="tier" key={tier.id}>
                  <input
                    id={`player${playerNum}-${tier.id}`}
                    className="players__input-tier"
                    name={`player${playerNum}-tier`}
                    value={tier.id}
                    type="radio"
                    checked={selectedTier === tier.id}
                    onChange={(e) => handlePlayerChange("tier", e.target.value)}
                  />
                  <label
                    htmlFor={`player${playerNum}-${tier.id}`}
                    className="players__tiers flex items-center text-center text-[2em]"
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
