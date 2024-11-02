import React from "react";
import { useNavigate } from "react-router-dom";
import selectGame from "../assets/ScreenShots/SelectGame.png";
import selectTier from "../assets/ScreenShots/SelectTiers.png";

export default function Onboarding({ isKorean }) {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/home");
  };

  return (
    <div className="mt-[10rem] flex min-h-screen w-[45rem] items-center justify-center rounded-xl bg-black bg-opacity-70 p-0">
      <div className="mb-8">
        <ol className="do-hyeon-regular mx-auto my-[5rem] flex max-w-md list-inside list-decimal flex-wrap gap-y-10 text-left">
          <li className="mb-3 text-2xl">
            {isKorean ? "게임을 선택하세요." : "Select your game."}
            <img className="my-[1rem]" src={selectGame} alt="" />
          </li>
          <li className="mb-3 text-2xl">
            {isKorean
              ? "플레이어들의 티어를 입력하세요."
              : "Enter players' ranks."}
            <br />
            <span className="text-lg text-gray-400">
              {isKorean
                ? "✔︎ 티어가 입력되지 않은 플레이어는 최하위 티어로 계산됩니다."
                : "✔︎ Players without a specified tier are considered to be at the lowest tier for calculation purposes."}
            </span>
            <img className="my-[1rem]" src={selectTier} alt="" />
          </li>
          <li className="mb-3 text-2xl">
            {isKorean
              ? "'Generate Fair Match!' 버튼을 클릭하여 결과를 확인하세요."
              : "Click 'Generate Fair Match!' to see the balanced match results."}
            <div className="flex justify-center w-full">
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
