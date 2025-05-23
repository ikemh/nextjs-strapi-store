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
      ? "bg-black/75 backdrop-blur-lg border-green-400/20 text-green-400/80"
      : type === "error"
        ? "bg-black/75 backdrop-blur-lg border-red-400/20 text-red-400/80"
        : "bg-black/75 backdrop-blur-lg border-yellow-400/20 text-yellow-400/85";

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
