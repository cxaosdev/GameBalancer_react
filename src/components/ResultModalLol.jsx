import React, { useRef } from "react";
import { FaClipboard, FaImage, FaLink } from "react-icons/fa";
import { toPng } from "html-to-image";
import topLaneImage from "../assets/lol_lane/top.svg";
import jungleLaneImage from "../assets/lol_lane/jungle.svg";
import midLaneImage from "../assets/lol_lane/mid.svg";
import adcLaneImage from "../assets/lol_lane/adc.svg";
import supportLaneImage from "../assets/lol_lane/support.svg";
import tierColors from "../styles/constants.json";

export default function ResultModalLol({
  isOpen,
  teams = {
    team1: [],
    team2: [],
    missingPositions: [],
    insufficientPositions: [],
  },
  onClose,
  generateShareableLink,
}) {
  const modalRef = useRef(null);
  const toastRef = useRef(null);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal__overlay")) {
      onClose();
    }
  };

  const showToast = (message) => {
    if (toastRef.current) {
      toastRef.current.innerText = message;
      toastRef.current.classList.remove("opacity-0");
      setTimeout(() => {
        toastRef.current.classList.add("opacity-0");
      }, 4000);
    }
  };

  const generateResultText = () => {
    const team1Text = teams.team1
      .map((player) => `${player.playerName} (${player.tier})`)
      .join("\n");
    const team2Text = teams.team2
      .map((player) => `${player.playerName} (${player.tier})`)
      .join("\n");

    return `Team 1 [Total Points: ${teams.team1Pts || 0}]:\n${team1Text}\n\nTeam 2 [Total Points: ${teams.team2Pts || 0}]:\n${team2Text}\n\nPoint Difference: ${Math.abs(
      (teams.team1Pts || 0) - (teams.team2Pts || 0),
    )}`;
  };

  const copyToClipboard = () => {
    const resultText = generateResultText();
    navigator.clipboard.writeText(resultText).then(() => {
      showToast("Results copied!");
    });
  };

  const saveAsImage = () => {
    if (modalRef.current) {
      toPng(modalRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "result.png";
          link.click();
          showToast("Image saved!");
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  };

  const copyLink = () => {
    const link = generateShareableLink();
    navigator.clipboard.writeText(link).then(() => showToast("Link copied!"));
  };

  if (!isOpen) return null;

  const laneIcons = {
    top: topLaneImage,
    jungle: jungleLaneImage,
    mid: midLaneImage,
    adc: adcLaneImage,
    support: supportLaneImage,
  };

  return (
    <div
      className="modal__overlay fixed inset-0 z-[100000] flex items-center justify-center bg-black bg-opacity-65"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="relative w-[60em] min-w-[55em] rounded-lg bg-gradient-to-r from-purple-800 to-indigo-900 p-7 shadow-2xl"
      >
        <button
          className="absolute right-4 top-0 text-[50px] text-white hover:text-yellow-300"
          onClick={onClose}
        >
          &times;
        </button>

        <div
          ref={toastRef}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 transform rounded-md bg-zinc-700 px-4 py-2 text-[1.3em] text-white opacity-0 shadow-lg transition-opacity duration-500 ease-out"
        ></div>

        {/* 포지션 부족 경고 */}
        {teams.missingPositions?.length > 0 ||
        teams.insufficientPositions?.length > 0 ? (
          <div className="text-center">
            <h2 className="flex items-center justify-center gap-2 text-4xl font-bold bg-transparent">
              <span className="text-white">❗️Need more players for..</span>
            </h2>
            <div className="mt-2 text-3xl">
              {teams.missingPositions.map((pos, index) => (
                <span className="text-amber-300" key={pos}>
                  {pos.charAt(0).toUpperCase() + pos.slice(1)}
                  {index < teams.missingPositions.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[auto-fit] gap-2 bg-transparent sm:grid-cols-2">
              {/* Team 1 */}
              <div className="p-3 text-white bg-transparent rounded-lg">
                <h2 className="text-4xl font-semibold text-center text-yellow-300 bg-transparent">
                  Team 1
                </h2>
                <h2 className="mb-6 text-2xl font-semibold text-center text-yellow-300 bg-transparent">
                  [ Total Points: {teams.team1Pts || 0} ]
                </h2>
                <ul className="space-y-4 bg-transparent">
                  {teams.team1.map((player, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-opacity-50 rounded-lg shadow-md bg-zinc-900"
                      style={{ padding: "1em" }}
                    >
                      <img
                        src={laneIcons[player.selectedLanes[0]]}
                        alt={player.selectedLanes[0]}
                        className="w-8 h-8 mr-2"
                      />

                      <span className="flex-grow text-2xl text-center text-white do-hyeon-regular">
                        {player.playerName}
                      </span>

                      <span
                        className="text-xl text-right text-white"
                        style={{
                          color: tierColors.lol_color[player.tier],
                          minWidth: "11em",
                        }}
                      >
                        {player.tier}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team 2 */}
              <div className="p-3 text-white bg-transparent rounded-lg">
                <h2 className="text-4xl font-semibold text-center text-yellow-300 bg-transparent">
                  Team 2
                </h2>
                <h2 className="mb-6 text-2xl font-semibold text-center text-yellow-300 bg-transparent">
                  [ Total Points: {teams.team2Pts || 0} ]
                </h2>
                <ul className="space-y-4 bg-transparent">
                  {teams.team2.map((player, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-opacity-50 rounded-lg shadow-md bg-zinc-900"
                      style={{ padding: "1em" }}
                    >
                      <img
                        src={laneIcons[player.selectedLanes[0]]}
                        alt={player.selectedLanes[0]}
                        className="w-8 h-8 mr-2"
                      />

                      <span className="flex-grow text-2xl text-center text-white do-hyeon-regular">
                        {player.playerName}
                      </span>

                      <span
                        className="text-xl text-right text-white"
                        style={{
                          color: tierColors.lol_color[player.tier],
                          minWidth: "11em",
                        }}
                      >
                        {player.tier}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Point Difference*/}
              <div className="col-span-2 text-center bg-transparent">
                <h2 className="mb-2 text-4xl font-bold text-yellow-300 bg-transparent">
                  Point Difference:{" "}
                  {Math.abs((teams.team1Pts || 0) - (teams.team2Pts || 0))}
                </h2>
                {teams.largeDifference && (
                  <p className="text-2xl font-semibold text-red-500">
                    ⚠️ Team balance difference is significant. Try to adjust
                    player positions.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-xl text-white hover:text-yellow-300"
              >
                <FaClipboard className="text-2xl" />
                <span>Copy Results</span>
              </button>
              <button
                onClick={saveAsImage}
                className="flex items-center gap-2 text-xl text-white hover:text-yellow-300"
              >
                <FaImage className="text-2xl" />
                <span>Save as Image</span>
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 text-xl text-white hover:text-yellow-300"
              >
                <FaLink className="text-2xl" />
                <span>Copy Link</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
