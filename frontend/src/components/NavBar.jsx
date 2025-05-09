// src/components/NavBar.jsx
"use client";
import React from "react";
import { Sidebar, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function NavBar({ onToggleDrawer, onToggleCart }) {
  const { items } = useCart();
  // soma todas as quantidades
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 grid grid-cols-12 items-center bg-[#1A1A1A]/80 backdrop-blur-lg border-b border-white/20 px-4 z-50 select-none">
      {/* Índice */}
      <div className="col-span-3 h-[100%]">
        <button
          onClick={onToggleDrawer}
          aria-label="Abrir menu"
          className="flex items-center cursor-pointer h-[100%] pr-[2rem]"
        >
          <Sidebar className="h-6 w-6" />
          <span className="ml-2 text-xs md:text-base font-bold">Índice</span>
        </button>
      </div>

      {/* Logo */}
      <div className="col-span-6 text-center">
        <img
          src="/logo.png"
          alt="Logo do site"
          className="h-14 w-auto inline-block"
        />
      </div>

      {/* Carrinho */}
      <div className="col-span-3 flex justify-end h-[100%]">
        <button
          onClick={onToggleCart}
          aria-label="Ver carrinho"
          className="relative flex items-center cursor-pointer h-[100%] pl-[4rem] py-6"
        >
          <span className="hidden md:inline mr-2 text-base font-bold">
            Carrinho
          </span>
          <div className="relative">
            <ShoppingCart className="h-6 w-6 text-white" />
            {totalQuantity > 0 && (
              <span
                className="
                absolute -top-3 -right-2
                bg-[#B8860B] text-white text-xs font-bold
                rounded-full w-5 h-5 flex items-center justify-center
              "
              >
                {totalQuantity}
              </span>
            )}
          </div>
        </button>
      </div>
    </header>
  );
}
