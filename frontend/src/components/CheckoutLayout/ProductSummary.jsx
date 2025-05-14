// src/components/ProductSummary.jsx
// Exibe lista de itens, totais e botões de remoção

import React from "react";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductSummary({ items, total }) {
  const { removeItem } = useCart();

  return (
    <section>
      <h1 className="uppercase tracking-wide text-3xl mb-6 text-[#DDDDDD] text-center">
        Resumo do Pedido
      </h1>

      {items.length === 0 ? (
        <p className="text-base text-[#AAAAAA]">Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {items.map((i, idx) => (
            <li
              key={i.sku}
              className={`flex items-center justify-between p-4 rounded-lg ${
                idx % 2 === 0 ? "bg-[#1E1E1E]" : "bg-[#2A2A2A]"
              }`}
            >
              <img
                src={i.image}
                alt={i.title}
                className="h-12 w-auto object-contain rounded-md"
              />
              <div className="flex-1 ml-4">
                <div className="font-semibold text-base text-white">
                  {i.title}
                </div>
                <div className="text-sm text-[#B3B3B3]">{i.material}</div>
              </div>
              <div className="w-12 text-center text-white font-medium">
                {i.quantity}
              </div>
              <div className="w-24 text-right text-white font-medium">
                R$ {(i.price * i.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeItem(i.sku)}
                aria-label="Remover item"
                className="ml-4 text-red-400 hover:text-red-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </li>
          ))}

          <li className="flex justify-between items-center mt-4 pt-4 border-t border-[rgba(255,255,255,0.3)]">
            <span className="font-semibold text-lg text-white">Total</span>
            <span className="font-semibold text-lg text-white">
              R$ {total.toFixed(2)}
            </span>
          </li>
        </ul>
      )}
    </section>
  );
}
