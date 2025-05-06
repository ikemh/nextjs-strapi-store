import React from "react";

export default function AddToCartButton() {
  return (
    <button
      className="
        mt-auto
        py-2 sm:py-3 px-3 sm:px-6
        bg-gradient-to-r from-[#D4AF37] to-[#B8860B]
        text-white font-semibold rounded-xl shadow-md
        hover:from-[#CFAF37] hover:to-[#A8760B]
        transition
        text-base sm:text-lg whitespace-nowrap
      "
    >
      Adicionar ao carrinho
    </button>
  );
}
