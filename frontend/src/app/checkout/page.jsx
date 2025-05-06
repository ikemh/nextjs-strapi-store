"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API;

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer || !phone) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, phone, items, total }),
      });
      if (!res.ok) throw new Error();
      clearCart();
      router.push("/success");
    } catch {
      alert("Falha ao enviar pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 text-white bg-[#202020] min-h-screen pt-16">
      <h1 className="text-2xl mb-4">Resumo do Pedido</h1>
      <ul className="mb-4">
        {items.map((i) => (
          <li key={i.sku} className="flex justify-between">
            <span>
              {i.title} x{i.quantity}
            </span>
            <span>R$ {(i.price * i.quantity).toFixed(2)}</span>
          </li>
        ))}
        <li className="flex justify-between font-semibold mt-2">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </li>
      </ul>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nome ou Empresa*</label>
          <input
            type="text"
            required
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full border p-2 rounded bg-[#2a2a2a]"
            placeholder="Ex: ACME Ltda."
          />
        </div>
        <div>
          <label className="block mb-1">Celular*</label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded bg-[#2a2a2a]"
            placeholder="+55 11 9XXXX-XXXX"
          />
        </div>
        <button
          type="submit"
          disabled={loading || items.length === 0}
          className="w-full py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Enviando…" : "Finalizar Pedido"}
        </button>
      </form>
    </div>
  );
}
