// components/CategoryChangeIndicator.jsx
// Indicador visual quando mudança de categoria está sendo processada

"use client";
import React from "react";

export default function CategoryChangeIndicator({
  isChanging,
  requestedCategory,
  activeCategory,
}) {
  if (!isChanging) return null;

  return (
    <div className="fixed bottom-[5vh] left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-[#1A1A1A]/70 backdrop-blur-lg text-white px-4 py-2 rounded-lg border border-[#D4AF37]/30 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-[#555] border-t-[#D4AF37] rounded-full animate-spin"></div>
          <span className="text-sm">
            Carregando{" "}
            <span className="font-bold text-[#D4AF37]">
              {requestedCategory}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
