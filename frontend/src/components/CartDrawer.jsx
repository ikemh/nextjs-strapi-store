"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartChangeToast from "./CartChangeToast";

export default function CartDrawer({ isOpen, onClose }) {
  const router = useRouter();
  const { items, removeItem } = useCart();
  const [toast, setToast] = useState(null);

  // calcula subtotal
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleRemove = (sku) => {
    removeItem(sku);
    setToast({ message: "Produto removido do carrinho!", type: "error" });
  };

  return (
    <div
      className={`z-40 fixed inset-0 ${isOpen ? "" : "pointer-events-none"}`}
      onClick={onClose}
    >
      <style jsx global>{`
        .cart-scrollbar .simplebar-track.simplebar-vertical {
          right: auto !important;
          left: 0 !important;
        }
      `}</style>

      <aside
        onClick={(e) => e.stopPropagation()}
        className={`
          fixed top-16 right-0
          h-[100%] w-65
          bg-[#2A2A2A]/95 backdrop-blur-lg
          border-l border-white/20
          origin-right transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar carrinho"
          className="z-50 cursor-pointer absolute top-[0.2rem] left-2 text-white text-2xl focus:outline-none"
        >
          ×
        </button>

        {/* Conteúdo rolável com classe específica */}
        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="mt-8 pb-60 pl-1 cart-scrollbar"
        >
          {items.length === 0 ? (
            <p className="pl-8 pt-2 text-xl text-[#B3B3B3]">Carrinho vazio.</p>
          ) : (
            <ul>
              {items.map((i, idx) => (
                <li
                  key={i.sku}
                  className={`
                    flex items-center justify-between px-4 py-3
                    border-b border-[#60606070]
                    ${idx === items.length - 1 ? "border-none" : ""}
                  `}
                >
                  <img
                    src={i.image}
                    alt={i.title}
                    className="h-8 w-auto object-contain rounded"
                  />
                  <div className="flex-1 ml-3">
                    <div className="font-semibold text-[1em] text-white">
                      {i.title}
                    </div>
                    <div className="text-[0.8rem] text-[#DADADA]">
                      {i.material}
                    </div>
                    <div className="text-[0.9rem] text-white mt-1">
                      x{i.quantity} · R$ {(i.price * i.quantity).toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(i.sku)}
                    aria-label="Remover item"
                    className="ml-2 text-red-400 hover:text-red-400/60 p-1 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </SimpleBar>

        {items.length > 0 && (
          <div className="fixed pb-[9rem] bottom-0 left-0 w-full p-4 bg-[#1A1A1A]/90 backdrop-blur-md z-60 border-t border-white/20">
            <div className="flex justify-between items-center text-base font-semibold text-white">
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </aside>

      {toast && (
        <CartChangeToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
