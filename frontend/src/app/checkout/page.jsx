"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import CheckoutLayout from "@/components/CheckoutLayout";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API;

export default function CheckoutPage() {
  // estado e hooks
  const { items, clearCart } = useCart();
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // cálculo de total
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // handler de submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer || !phone || items.length === 0) return;
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
    <CheckoutLayout
      items={items}
      total={total}
      customer={customer}
      phone={phone}
      loading={loading}
      onCustomerChange={setCustomer}
      onPhoneChange={setPhone}
      onSubmit={handleSubmit}
    />
  );
}
