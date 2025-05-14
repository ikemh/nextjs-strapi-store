// src/components/CustomerInfoForm.jsx

import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext"; // Importando o useCart
import Script from "next/script";
import {
  initPhoneInput,
  validatePhoneBR,
} from "@/components/CheckoutLayout/utils/phoneUtils";
import { validateEmail } from "@/components/CheckoutLayout/utils/emailUtils";
import { fetchAddressByCEP } from "@/components/CheckoutLayout/utils/cepUtils";

export default function CustomerInfoForm({
  customer,
  email,
  phone,
  loading,
  disableSubmit,
  onCustomerChange,
  onEmailChange,
  onPhoneChange,
  onSubmit, // Passando a função de submit
}) {
  const { items } = useCart();
  const phoneRef = useRef(null);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [loadingCep, setLoadingCep] = useState(false);
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  useEffect(() => {
    if (!phoneRef.current) return;
    const cleanup = initPhoneInput(phoneRef, onPhoneChange);
    return cleanup;
  }, [onPhoneChange]);

  useEffect(() => {
    const sanitized = cep.replace(/\D/g, "");
    if (sanitized.length === 8) {
      setLoadingCep(true);
      fetchAddressByCEP(sanitized)
        .then(setAddress)
        .catch((err) => {
          alert(err.message);
          setAddress({ street: "", neighborhood: "", city: "", state: "" });
        })
        .finally(() => setLoadingCep(false));
    }
  }, [cep]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de email
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      alert(emailCheck.reason);
      return;
    }

    // Validação de telefone
    const phoneVal = validatePhoneBR(phoneRef.current.value);
    if (!phoneVal.valid) {
      alert(phoneVal.reason);
      return;
    }

    // Chama a função `onSubmit` do CheckoutPage.jsx
    onPhoneChange(phoneVal.e164); // Atualiza o telefone no contexto

    const orderData = {
      customer,
      email,
      phone: phoneVal.e164,
      address,
      cartItems: items,
    };
    onSubmit(orderData); // Passa os dados validados para o CheckoutPage para envio
  };

  return (
    <section className="bg-[#1E1E1E] bg-opacity-90 p-6 rounded-2xl border border-[#2A2A2A] shadow-inner">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        strategy="afterInteractive"
      />
      <h2 className="uppercase tracking-wide text-2xl mb-4 text-[#DDDDDD]">
        Informações
      </h2>
      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        {/* Nome/Empresa */}
        <div>
          <label className="block mb-2 text-sm text-[#DADADA] font-bold after:content-['*'] after:ml-1 after:text-red-500/30">
            Nome/Empresa
          </label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={customer}
            onChange={(e) => onCustomerChange(e.target.value)}
            required
            minLength={2}
            placeholder="João da Silva / Empresa XYZ"
            className="w-full p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-gray-400/25"
          />
        </div>

        {/* E-mail */}
        <div>
          <label className="block mb-2 text-sm text-[#DADADA] font-bold after:content-['*'] after:ml-1 after:text-red-500/30">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            placeholder="joao@gmail.com"
            className="w-full p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-gray-400/25"
          />
        </div>

        {/* CEP */}
        <div>
          <label className="block mb-2 text-sm text-[#DADADA] font-bold after:content-['*'] after:ml-1 after:text-red-500/30">
            CEP
          </label>
          <input
            type="text"
            name="postal-code"
            autoComplete="postal-code"
            value={cep.replace(/(\d{5})(\d{1,3})?/, (_, p1, p2) =>
              p2 ? `${p1}-${p2}` : p1
            )}
            onChange={(e) =>
              setCep(e.target.value.replace(/\D/g, "").slice(0, 8))
            }
            required
            maxLength={9}
            pattern="[0-9]{5}-[0-9]{3}"
            title="Digite um CEP no formato 00000-000"
            placeholder="00000-000"
            className="w-full p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-gray-400 placeholder-opacity-25"
          />
        </div>

        {/* Endereço preenchido */}
        {address.street && (
          <>
            <div>
              <label className="block mb-2 text-sm text-[#DADADA] font-bold after:content-['*'] after:ml-1 after:text-red-500/30">
                Rua
              </label>
              <input
                type="text"
                value={address.street}
                readOnly
                className="w-full p-3 rounded-xl bg-[#2A2A2A] border border-[#3A3A3A] text-[#CCCCCC]"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-[#DADADA] font-bold after:content-['*'] after:ml-1 after:text-red-500/30">
                Bairro
              </label>
              <input
                type="text"
                value={address.neighborhood}
                readOnly
                className="w-full p-3 rounded-xl bg-[#2A2A2A] border border-[#3A3A3A] text-[#CCCCCC]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm text-[#DADADA] font-bold after:content-['*'] after:ml-1 after:text-red-500/30">
                  Cidade
                </label>
                <input
                  type="text"
                  value={address.city}
                  readOnly
                  className="w-full p-3 rounded-xl bg-[#2A2A2A] border border-[#3A3A3A] text-[#CCCCCC]"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-[#DADADA]">UF</label>
                <input
                  type="text"
                  value={address.state}
                  readOnly
                  className="w-full p-3 rounded-xl bg-[#2A2A2A] border border-[#3A3A3A] text-[#CCCCCC]"
                />
              </div>
            </div>

            {/* Número */}
            <div>
              <label className="block mb-2 text-sm text-[#DADADA] font-bold after:content-['*'] after:ml-1 after:text-red-500/30">
                Número
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                placeholder="99"
                className="w-full p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-gray-400/25"
              />
            </div>

            {/* Complemento */}
            <div>
              <label className="block mb-2 text-sm text-[#DADADA] font-bold">
                Complemento
              </label>
              <input
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                placeholder="Pavilhão Esquina"
                className="w-full p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-gray-400/25"
              />
            </div>
          </>
        )}

        {/* Celular */}
        <div>
          <label className="block mb-2 text-sm text-[#DADADA] font-bold after:content-['*'] after:ml-1 after:text-red-500/30">
            Celular
          </label>
          <input
            ref={phoneRef}
            type="tel"
            name="tel"
            autoComplete="tel"
            defaultValue={phone}
            required
            placeholder="(00) 00000-0000"
            className="w-full p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-gray-400/25"
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={loading || disableSubmit || loadingCep}
          className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#CFAF37] hover:to-[#A8760B] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading
            ? "Enviando…"
            : loadingCep
              ? "Buscando CEP…"
              : "Finalizar Pedido"}
        </button>
      </form>
    </section>
  );
}
