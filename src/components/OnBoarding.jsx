import React from "react";
import { useNavigate } from "react-router-dom";
import selectGame from "../assets/ScreenShots/SelectGame.png";
import selectTier from "../assets/ScreenShots/SelectTiers.png";

export default function Onboarding() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/home");
  };

  return (
    <div className="mt-[10rem] flex min-h-screen w-[45rem] items-center justify-center rounded-xl bg-black bg-opacity-70 p-0">
      <div className="mb-8">
        <ol className="do-hyeon-regular mx-auto my-[5rem] flex max-w-md list-inside list-decimal flex-wrap gap-y-10 text-left">
          <li className="mb-3 text-2xl">
            Select your game.
            <img className="my-[1rem]" src={selectGame} alt="" />
          </li>
          <li className="mb-3 text-2xl">
            Enter players' ranks.<br></br>
            <span className="text-lg text-gray-400">
              ✔︎ Players without a specified tier are considered to be at the
              lowest tier for calculation purposes.
            </span>
            <img className="my-[1rem]" src={selectTier} alt="" />
          </li>
          <li className="mb-3 flex flex-col text-2xl">
            Click 'Generate Fair Match!' to see the balanced match results.
            <div className="w[100%] flex justify-center">
              {" "}
              <button className="New-Amsterdam ml-2 mt-10 flex w-[18rem] cursor-default items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-[30px] text-white shadow-sm">
                <span>Generate Fair Match!</span>
              </button>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
