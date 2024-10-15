import React from "react";

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <div className="mb-4 h-24 w-24 animate-spin rounded-full border-b-4 border-t-4 border-purple-800 bg-transparent"></div>
      <span className="text-3xl text-white text-yellow-300">Generating...</span>
    </div>
  );
}
