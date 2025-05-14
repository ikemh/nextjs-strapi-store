import React from "react";

export default function ZoomToolbar({ scale, onScale, onClose }) {
  return (
    <div
      className="
      fixed bottom-8
      left-1/2 transform -translate-x-1/2
      flex space-x-2 md:space-x-4 z-50
    "
    >
      <button
        onClick={() => onScale(scale - 0.2)}
        className="
          w-12 h-12
          bg-[#000000] hover:bg-[#303030]
          text-white text-base text-lg
          rounded-full shadow-md
        "
      >
        −
      </button>
      <button
        onClick={() => onScale(scale + 0.2)}
        className="
          w-12 h-12
          bg-[#000000] hover:bg-[#303030]
          text-white text-base text-lg
          rounded-full shadow-md
        "
      >
        +
      </button>
      <button
        onClick={onClose}
        className="
          w-12 h-12
          bg-red-400 hover:bg-red-500
          text-white text-base text-lg
          rounded-full shadow-md
        "
      >
        ×
      </button>
    </div>
  );
}
