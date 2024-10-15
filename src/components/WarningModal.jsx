import React from "react";

export default function WarningModal({ onClose, onContinue }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md p-10 text-center">
        <h2 className="do-hyeon-regular mb-10 text-4xl">
          Please fill out all fields.
        </h2>
        <div className="flex justify-center gap-5">
          <button
            onClick={onContinue}
            className="do-hyeon-regular rounded-md bg-red-500 px-7 py-3 text-2xl text-white"
          >
            Generate anyway
          </button>
          <button
            onClick={onClose}
            className="do-hyeon-regular rounded-md bg-green-500 px-7 py-3 text-2xl text-white"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
