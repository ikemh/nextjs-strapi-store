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
    <header className="fixed grid min-h-[5vw] grid-cols-3 items-center justify-items-center top-0 left-0 right-0 bg-[#1A1A1A]/70 backdrop-blur-lg border-b border-white/10 px-[2vw] z-50 select-none">
      {/* Índice */}
      <div className="col-span-1 h-[100%]  justify-self-start">
        <button
          onClick={onToggleDrawer}
          aria-label="Abrir menu"
          className="flex items-center cursor-pointer  h-[100%]"
        >
          <Sidebar className="h-[auto] w-[clamp(5vh,3rem,5vh)]" />
          <span className="ml-[max(0.2rem,1vw)] text-[clamp(3vh,2rem,3vh)] font-bold">
            Índice
          </span>
        </button>
      </div>

      {/* Logo */}
      <div className="col-span-1 text-center justify-self-center ">
        <img
          src="/logo.png"
          alt="Logo do site"
          className="w-auto inline-block h-[clamp(9vh,5rem,9vh)]"
        />
      </div>

      {/* Carrinho */}
      <div className="col-span-1 flex justify-self-end h-[100%] max-h-[3rem]">
        <button
          onClick={onToggleCart}
          aria-label="Ver carrinho"
          className="relative flex items-center cursor-pointer h-[100%] pl-[4rem] py-6"
        >
          <span className="hidden md:inline mr-[1vw] text-[clamp(3vh,2rem,3vh)] font-bold">
            Carrinho
          </span>
          <div className="relative">
            <ShoppingCart className="h-[auto] w-[clamp(5vh,3rem,5vh)] text-white" />
            {totalQuantity > 0 && (
              <span
                className="
                  absolute -top-[1vh] -right-[1vh]
                  bg-[#B8860B] text-white text-[clamp(2vh,1.5rem,2vh)] font-bold
                  rounded-full h-[auto] w-[clamp(3vh,2rem,3vh)] flex items-center justify-center
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
