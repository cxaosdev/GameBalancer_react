import React, { useState } from "react";

const maps = [
  { name: "Abyss", src: "/src/assets/maps/abyss.webp" },
  { name: "Ascent", src: "/src/assets/maps/ascent.webp" },
  { name: "Bind", src: "/src/assets/maps/bind.webp" },
  { name: "Breeze", src: "/src/assets/maps/breeze.webp" },
  { name: "Fracture", src: "/src/assets/maps/fracture.webp" },
  { name: "Haven", src: "/src/assets/maps/haven.webp" },
  { name: "Icebox", src: "/src/assets/maps/icebox.webp" },
  { name: "Lotus", src: "/src/assets/maps/lotus.webp" },
  { name: "Pearl", src: "/src/assets/maps/pearl.webp" },
  { name: "Split", src: "/src/assets/maps/split.webp" },
  { name: "Sunset", src: "/src/assets/maps/sunset.webp" },
];

export default function VlrtRandomMap() {
  const [excludedMaps, setExcludedMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);

  const toggleMap = (mapName) => {
    setExcludedMaps((prev) =>
      prev.includes(mapName)
        ? prev.filter((name) => name !== mapName)
        : [...prev, mapName],
    );
  };

  const getRandomMap = () => {
    const availableMaps = maps.filter(
      (map) => !excludedMaps.includes(map.name),
    );
    if (availableMaps.length === 0) {
      alert("선택 가능한 맵이 없습니다.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableMaps.length);
    setSelectedMap(availableMaps[randomIndex]);
  };

  const closeModal = (e) => {
    // 클릭된 요소가 모달 외부인지 확인
    if (e.target.id === "modal-background") {
      setSelectedMap(null);
    }
  };

  return (
    <div className="page-container vlrt__container relative flex flex-col items-center overflow-y-auto pt-[9vh]">
      <h1 className="mb-8 mt-[5rem] text-center text-[4rem] font-bold">
        Random Map Selector
      </h1>
      <div className="flex items-center justify-center">
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {maps.map((map) => (
            <div
              key={map.name}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              onClick={() => toggleMap(map.name)}
            >
              <img
                src={map.src}
                alt={map.name}
                className={`h-32 w-48 object-cover transition duration-300 ${
                  excludedMaps.includes(map.name) ? "grayscale" : "grayscale-0"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 text-center text-[2rem] font-semibold ${
                  excludedMaps.includes(map.name)
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                {map.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={getRandomMap}
        className="flex h-[3.5rem] w-[8rem] items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-center text-[40px] text-white shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none"
      >
        Go!
      </button>

      {selectedMap && (
        <div
          id="modal-background"
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal} // 배경 클릭
        >
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 이벤트 방지
          >
            <img
              src={selectedMap.src}
              alt={selectedMap.name}
              className="w-[60vw] max-w-2xl rounded-lg shadow-2xl"
            />
            <h2 className="mb-4 mt-4 text-[4rem] font-bold text-white">
              {selectedMap.name}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
