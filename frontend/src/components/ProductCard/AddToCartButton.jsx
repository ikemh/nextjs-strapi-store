"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartChangeToast from "../CartChangeToast";

export default function AddToCartButton({ onClick, disabled }) {
  const [toast, setToast] = useState(null);

  const handleClick = () => {
    if (onClick) onClick();
    setToast({ message: "Produto adicionado ao carrinho!", type: "success" });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`
          mt-auto py-2 sm:py-3 px-3 sm:px-6
          bg-gradient-to-r from-[#CFAF37] to-[#A8760B]
          hover:from-[#D4AF37] hover:to-[#B8860B]
          text-white font-semibold rounded-xl shadow-md
          transition flex items-center justify-center space-x-2
          text-base sm:text-lg
          cursor-pointer disabled:pointer-events-none
        `}
      >
        <ShoppingCart className="h-5 w-5" />
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
