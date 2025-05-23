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
          fixed top-[8vh] right-0
          h-[100%] w-65 min-w-[40vh] max-w-[10rem]
          bg-[#1A1A1A]/70 backdrop-blur-lg
          border-l border-white/10
          origin-right transform transition-transform duration-350 md:top-[10vh] min-w-[40vh]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar carrinho"
          className="z-50 cursor-pointer absolute top-[1vh] left-[1vh] text-white text-[4vh] focus:outline-none"
        >
          ×
        </button>
        {/* Conteúdo rolável com classe específica */}
        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="mt-[6vh] pl-[0.5vh] pb-[40vh] cart-scrollbar"
        >
          {items.length === 0 ? (
            <p className="pl-[3vh] pt-[3vh] text-[3.5vh] text-[#dadada]">
              Carrinho vazio.
            </p>
          ) : (
            <ul>
              {items.map((i, idx) => (
                <li
                  key={i.sku}
                  className={`
                    flex items-center justify-between px-[1vh] py-[0.5vh]
                    border-b border-[#60606070]
                    ${idx === items.length - 1 ? "border-none" : ""}
                  `}
                >
                  <img
                    src={i.image}
                    alt={i.title}
                    className="h-[5.5vh] w-auto object-contain rounded"
                  />
                  <div className="flex-1 ml-[2.1vh]">
                    <div className="font-semibold text-[2.3vh] text-white">
                      {i.title}
                    </div>
                    <div className="text-[2.1vh] text-[#DADADA]">
                      {i.material}
                    </div>
                    <div className="text-[2vh] text-white mt-[0.5vh]">
                      x{i.quantity} · R$ {(i.price * i.quantity).toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(i.sku)}
                    aria-label="Remover item"
                    className="text-red-400 hover:text-red-500/80 p-1 cursor-pointer"
                  >
                    <X className="h-[auto] w-[2.5vh]" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </SimpleBar>

        {items.length > 0 && (
          <div className="fixed pb-[22vh] bottom-0 left-0 w-full p-[2vh] bg-[#1A1A1A]/90 backdrop-blur-md z-60 border-t border-white/20">
            <div className="flex justify-between items-center text-[3vh] font-semibold text-white">
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
