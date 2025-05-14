// src/components/CheckoutLayout.jsx

"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductSummary from "./ProductSummary";
import CustomerInfoForm from "./CustomerInfoForm";

export default function CheckoutLayout({
  items,
  total,
  customer,
  email,
  phone,
  loading,
  onCustomerChange,
  onEmailChange,
  onPhoneChange,
  onSubmit,
}) {
  return (
    <div className="min-h-screen bg-[#202020] text-white font-roboto antialiased">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 px-4 py-3 grid grid-cols-12 items-center bg-[rgba(26,26,26,0.7)] backdrop-blur-lg z-30 border-b border-white/20">
        <div className="col-span-2 flex items-center">
          <Link
            href="/"
            aria-label="Voltar ao catálogo"
            className="flex items-center"
          >
            <ArrowLeft className="h-6 w-6 text-white mr-1" />
            <span className="text-white text-base font-bold">Catálogo</span>
          </Link>
        </div>
        <div className="col-span-8 text-center">
          <img
            src="/logo.png"
            alt="Logo do site"
            className="h-14 w-auto inline-block"
          />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="pt-30 pb-10 px-4 max-w-6xl mx-auto space-y-12 backdrop-blur-sm bg-[#252525] bg-opacity-90 min-h-[100vh] md:w-120">
        <ProductSummary items={items} total={total} />

        <CustomerInfoForm
          customer={customer}
          email={email}
          phone={phone}
          loading={loading}
          disableSubmit={items.length === 0}
          onCustomerChange={onCustomerChange}
          onEmailChange={onEmailChange}
          onPhoneChange={onPhoneChange}
          onSubmit={onSubmit}
        />
      </main>
    </div>
  );
}
