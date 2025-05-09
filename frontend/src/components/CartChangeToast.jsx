// src/components/CartChangeToast.jsx
"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function CartChangeToast({
  message,
  type = "success",
  onClose,
}) {
  // fecha automaticamente após 2s
  useEffect(() => {
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  }, [onClose]);

  // cores suaves
  const bgClass =
    type === "success"
      ? "bg-[#2A2A2A]/95 backdrop-blur-lg border-green-100 text-green-500"
      : "bg-[#2A2A2A]/95 backdrop-blur-lg   border-red-100   text-red-500";

  return createPortal(
    <div className="fixed top-20 w-80 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`
          max-w-md
          ${bgClass}
          backdrop-blur-lg
          rounded-lg
          border
          px-4 py-2
          shadow-lg
          text-center
          font-medium
        `}
      >
        {message}
      </div>
    </div>,
    document.body
  );
}
