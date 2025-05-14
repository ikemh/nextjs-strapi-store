// src/app/checkout/page.jsx

"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import CheckoutLayout from "@/components/CheckoutLayout/CheckoutLayout";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Funções para atualizar os valores dos estados
  const handleCustomerChange = (value) => setCustomer(value);
  const handleEmailChange = (value) => setEmail(value);
  const handlePhoneChange = (value) => setPhone(value);

  // Cálculo do total
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (orderData) => {
    setLoading(true);

    try {
      const res = await fetch("/api/submitOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const result = await res.json();
      alert(result.message);
      clearCart(); // Limpa o carrinho após sucesso
      router.push("/success"); // Redireciona para página de sucesso
    } catch (error) {
      alert("Erro ao enviar pedido.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutLayout
      items={items}
      total={total}
      customer={customer}
      email={email}
      phone={phone}
      loading={loading}
      onCustomerChange={handleCustomerChange}
      onEmailChange={handleEmailChange}
      onPhoneChange={handlePhoneChange}
      onSubmit={handleSubmit} // Passando a função de submit para o CheckoutLayout
    />
  );
}
