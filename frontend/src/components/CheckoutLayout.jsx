// src/components/CheckoutLayout.jsx
"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutLayout({
  items,
  total,
  customer,
  phone,
  loading,
  onCustomerChange,
  onPhoneChange,
  onSubmit,
  isSidebarOpen,
  onToggleSidebar,
}) {
  const { removeItem } = useCart();

  return (
    <div className="min-h-screen bg-[#202020] text-white font-roboto antialiased">
      {/* Header fixo */}
      <header
        className="
          fixed top-0 left-0 right-0
          h-16 px-4 py-3
          grid grid-cols-12 items-center
          bg-[rgba(26,26,26,0.7)] backdrop-blur-lg
          z-30
        "
      >
        {/* Botão Voltar */}
        <div className="col-span-2 flex items-center">
          <Link
            href="/"
            aria-label="Voltar ao catálogo"
            className="flex items-center"
          >
            <ArrowLeft className="h-6 w-6 text-white mr-1" />
            <span className="text-white text-base">Catálogo</span>
          </Link>
        </div>

        {/* Logo central */}
        <div className="col-span-8 text-center">
          <span
            className="uppercase tracking-wide text-2xl text-[#DDDDDD]
                       drop-shadow-[2px_2px_0_rgba(0,0,0,0.7)]
                       drop-shadow-[-1px_-1px_0_rgba(255,255,255,0.15)]
                       drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          >
            Meu Catálogo
          </span>
        </div>

        {/* Ícone de carrinho */}
        <div className="col-span-2 flex justify-end">
          <button
            onClick={onToggleSidebar}
            aria-label="Ver carrinho"
            className="flex items-center"
          >
            <ShoppingCart className="h-6 w-6 text-white mr-1" />
            <span className="text-white text-base">{items.length}</span>
          </button>
        </div>
      </header>

      {/* Sidebar do carrinho */}
      <aside
        className={`
          fixed top-16 left-0
          h-[calc(100%-4rem)] w-64
          bg-[rgba(26,26,26,0.7)] backdrop-blur-lg
          transform ${isSidebarOpen ? "scale-x-100" : "scale-x-0"}
          origin-left
          transition-transform duration-300 ease-in-out
          z-20
        `}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">Seu Carrinho</h2>
          {items.length === 0 ? (
            <p className="text-sm text-[#B3B3B3]">Carrinho vazio.</p>
          ) : (
            <ul className="space-y-2">
              {items.map((i) => (
                <li
                  key={i.sku}
                  className="
                    bg-[#1E1E1E] border border-[#2A2A2A] p-2 rounded-xl
                    shadow-lg shadow-[rgba(0,0,0,0.5)] backdrop-blur-sm
                    flex justify-between items-center
                  "
                >
                  <div>
                    <span className="font-semibold text-sm block">
                      {i.title}
                    </span>
                    <span className="text-xs text-[#DADADA] block">
                      SKU: {i.sku}
                    </span>
                    <span className="text-xs text-[#B3B3B3]">
                      x{i.quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(i.sku)}
                    aria-label="Remover item"
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-12 backdrop-blur-sm bg-[#252525] bg-opacity-90">
        {/* Resumo do Pedido */}
        {/* Resumo do Pedido */}
        <section>
          <h1
            className="
      uppercase tracking-wide text-5xl mb-6 text-[#DDDDDD]
      drop-shadow-[2px_2px_0_rgba(0,0,0,0.7)]
      drop-shadow-[-1px_-1px_0_rgba(255,255,255,0.15)]
      drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]
    "
          >
            Resumo do Pedido
          </h1>

          {items.length === 0 ? (
            <p className="text-base text-[#AAAAAA]">Seu carrinho está vazio.</p>
          ) : (
            <ul>
              {items.map((i, idx) => (
                <li
                  key={i.sku}
                  className={`
            flex items-center justify-between p-4 rounded-lg
            ${idx % 2 === 0 ? "bg-[#1E1E1E]" : "bg-[#2A2A2A]"}
          `}
                >
                  {/* Miniatura */}
                  <img
                    src={i.image}
                    alt={i.title}
                    className="h-12 w-auto object-contain rounded-md"
                  />

                  {/* Título / Modelo e Material */}
                  <div className="flex-1 ml-4">
                    <div className="font-semibold text-base text-white">
                      {i.title}
                    </div>
                    <div className="text-sm text-[#B3B3B3]">{i.material}</div>
                  </div>

                  {/* Quantidade */}
                  <div className="w-12 text-center text-white font-medium">
                    {i.quantity}
                  </div>

                  {/* Valor */}
                  <div className="w-24 text-right text-white font-medium">
                    R$ {(i.price * i.quantity).toFixed(2)}
                  </div>

                  {/* Botão remover */}
                  <button
                    onClick={() => removeItem(i.sku)}
                    aria-label="Remover item"
                    className="ml-4 text-red-400 hover:text-red-600 p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </li>
              ))}

              {/* Total Geral */}
              <li className="flex justify-between items-center mt-4 pt-4 border-t border-[rgba(255,255,255,0.3)]">
                <span className="font-semibold text-lg text-white">Total</span>
                <span className="font-semibold text-lg text-white">
                  R$ {total.toFixed(2)}
                </span>
              </li>
            </ul>
          )}
        </section>

        {/* Formulário de Informações */}
        <section
          className="
            bg-[#1E1E1E] bg-opacity-90 p-6 rounded-2xl
            border border-[#2A2A2A]
            shadow-inner shadow-[inset_2px_2px_0_rgba(0,0,0,0.7),inset_-1px_-1px_0_rgba(255,255,255,0.15)]
          "
        >
          <h2
            className="
              uppercase tracking-wide text-2xl mb-4 text-[#DDDDDD]
              drop-shadow-[2px_2px_0_rgba(0,0,0,0.7)]
              drop-shadow-[-1px_-1px_0_rgba(255,255,255,0.15)]
              drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]
            "
          >
            Informações
          </h2>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-[#DADADA]">
                Nome ou Empresa*
              </label>
              <input
                type="text"
                value={customer}
                onChange={(e) => onCustomerChange(e.target.value)}
                required
                className="
                  w-full p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]
                  focus:ring-2 focus:ring-[#D4AF37] text-white
                "
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-[#DADADA]">
                Celular*
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                required
                className="
                  w-full p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]
                  focus:ring-2 focus:ring-[#D4AF37] text-white
                "
              />
            </div>
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="
                w-full py-3 text-lg font-semibold rounded-xl
                bg-gradient-to-r from-[#D4AF37] to-[#B8860B]
                hover:from-[#CFAF37] hover:to-[#A8760B]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "Enviando…" : "Finalizar Pedido"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
