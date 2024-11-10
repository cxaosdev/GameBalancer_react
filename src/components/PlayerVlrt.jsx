import React, { useState, memo, useEffect } from "react";
import tierColors from "../styles/constants.json";

const PlayerVlrt = memo(
  ({ playerNum, playerName, selectedTier, handlePlayerChange }) => {
    console.log(`rendered player ${playerNum}`);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isLgView, setIsLgView] = useState(window.innerWidth <= 1380);
    const [isSmView, setIsSmView] = useState(window.innerWidth <= 920);

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
        setIsLgView(window.innerWidth <= 1380);
        setIsSmView(window.innerWidth <= 920);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    return (
      <div className="player mt-[0.5vh] flex justify-center">
        <section className="flex items-center justify-between players">
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
                  className="tier-dropdown ml-[2vw] flex w-[7em] cursor-pointer items-center justify-center rounded-md bg-white text-center text-[1.3em]"
                  onClick={toggleDropdown}
                >
                  <span
                    className="selected-tier m-0 p-0 text-[1.3em]"
                    style={{
                      color: selectedTier
                        ? tierColors.vlrt_color[selectedTier]
                        : "gray",
                    }}
                  >
                    {selectedTier || (
                      <span className="text-gray-700">Select Tier &#9660;</span>
                    )}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="scrollbar-custom tier-dropdown-menu absolute z-[100000000] ml-[2vw] max-h-[7em] w-[7em] overflow-y-auto rounded-md bg-[#333] text-[1.3em] shadow-lg">
                    {tiers.map((tier) => (
                      <div
                        className="tier-option cursor-pointer px-[0.5em] py-[0.4em] text-center"
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
              <div className="flex-col mt-3 ml-3">
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
