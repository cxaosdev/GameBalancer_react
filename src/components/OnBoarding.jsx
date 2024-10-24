import React from "react";
import { useNavigate } from "react-router-dom";
import SelectGame from "../assets/ScreenShots/SelectGame.png";
import SelectTier from "../assets/ScreenShots/SelectTiers.png";

export default function Onboarding() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/home");
  };

  return (
    <div className="mt-[10rem] flex min-h-screen w-[40rem] items-center justify-center rounded-xl bg-black bg-opacity-70 p-0">
      <div className="mb-8">
        <ol className="do-hyeon-regular mx-auto my-[3rem] flex max-w-md list-inside list-decimal flex-wrap text-left">
          <li className="mb-3 text-2xl">
            Select your game.
            <img className="my-[1rem]" src={SelectGame} alt="" />
          </li>
          <li className="mb-3 text-2xl">
            Enter players' ranks.<br></br>
            <span className="text-xl">
              ✔︎ Players without a specified tier are considered to be at the
              lowest tier for calculation purposes.
            </span>
            <img className="my-[1rem]" src={SelectTier} alt="" />
          </li>
          <li className="mb-3 text-2xl">
            Click 'Generate Fair Match!' to see the balanced match results.
            <button className="New-Amsterdam ml-2 mt-4 flex w-[18rem] cursor-default items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-[30px] text-white shadow-sm">
              <span>Generate Fair Match!</span>
            </button>
          </li>
        </ol>
      </div>
    </div>
  );
}
