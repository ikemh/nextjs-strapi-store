"use client";
import React from "react";
import { Sidebar, ShoppingCart } from "lucide-react";

export default function NavBar({ onToggleDrawer }) {
  return (
    <header className="fixed top-0 left-0 right-0 grid grid-cols-12 items-center bg-[#1A1A1A]/70 backdrop-blur-lg px-4 py-3 z-50">
      {/* Índice - 25% (3/12 colunas) */}
      <div className="col-span-3">
        <button
          onClick={onToggleDrawer}
          aria-label="Abrir menu"
          className="flex items-center md:flex-row md:items-center"
        >
          <Sidebar className="h-6 w-6" />
          <span className="inline ml-2 text-xs md:text-base">Índice</span>
        </button>
      </div>

      {/* Logo - 50% (6/12 colunas) */}
      <div className="col-span-6 text-center">
        <img
          src="/logo.png"
          alt="Logo do site"
          className="h-12 w-auto inline-block"
        />
      </div>

      {/* Carrinho - 25% (3/12 colunas) */}
      <div className="col-span-3 flex justify-end">
        <button
          aria-label="Ver carrinho"
          className="flex flex-col items-end md:flex-row md:items-center"
        >
          <span className="hidden md:inline mr-2 text-base">Carrinho</span>
          <ShoppingCart className="h-6 w-6 md:mt-0" />
        </button>
      </div>
    </header>
  );
}
