// src/components/AddToCartButton.jsx
"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartChangeToast from "../CartChangeToast";

export default function AddToCartButton({ onClick, disabled }) {
  const [toast, setToast] = useState(null);

  const handleClick = () => {
    if (disabled) {
      setToast({ message: "Selecione algum produto!", type: "alert" });
      return;
    }
    if (onClick) onClick();
    setToast({ message: "Produto adicionado ao carrinho!", type: "success" });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`
          mt-auto py-2 sm:py-3 px-3 sm:px-6
          bg-gradient-to-r from-[#D4AF37] to-[#A8760B]
          hover:from-[#CFAF37] hover:to-[#B8860B]
          text-[#1a1a1a] font-semibold rounded-xl shadow-md
          transition flex items-center justify-center space-x-2
          text-base sm:text-lg font-bold
          ${disabled ? "cursor-default" : "cursor-pointer"}
        `}
      >
        <ShoppingCart className="h-6 w-6" />
        <span>Adicionar ao carrinho</span>
      </button>

      {toast && (
        <CartChangeToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
