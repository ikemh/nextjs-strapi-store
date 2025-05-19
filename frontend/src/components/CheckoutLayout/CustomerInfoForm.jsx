import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Script from "next/script";

import InputField from "./InputField";
import AddressSection from "./AddressSection";
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
  onCustomerChange,
  onEmailChange,
  onPhoneChange,
  onSubmit,
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
  const [phoneValid, setPhoneValid] = useState(null);
  const [cepValid, setCepValid] = useState(null);

  useEffect(() => {
    const value = phoneRef.current?.value || "";
    setPhoneValid(validatePhoneBR(value).valid);
  }, [phone]);

  useEffect(() => {
    if (!phoneRef.current) return;
    const cleanup = initPhoneInput(phoneRef, onPhoneChange);
    return cleanup;
  }, [onPhoneChange]);

  useEffect(() => {
    const sanitized = cep.replace(/\D/g, "");
    if (sanitized.length < 8) {
      setCepValid(false);
      return;
    }
    setLoadingCep(true);
    fetchAddressByCEP(sanitized)
      .then((res) => {
        setAddress(res);
        setCepValid(true);
      })
      .catch((err) => {
        alert(err.message);
        setAddress({ street: "", neighborhood: "", city: "", state: "" });
        setCepValid(false);
      })
      .finally(() => setLoadingCep(false));
  }, [cep]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const trimmedName = customer.trim();
    if (trimmedName.length < 2) {
      alert("Nome deve ter pelo menos 2 letras.");
      return;
    }
    if (number.trim() === "") {
      alert("Número do endereço não pode ficar em branco.");
      return;
    }
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      alert(emailCheck.reason);
      return;
    }
    const phoneVal = validatePhoneBR(phoneRef.current.value);
    if (!phoneVal.valid) {
      alert(phoneVal.reason);
      return;
    }
    const sanitizedCep = cep.replace(/\D/g, "");
    if (sanitizedCep.length !== 8) {
      alert("CEP deve conter 8 dígitos.");
      return;
    }
    if (!address.street) {
      alert("Endereço inválido ou CEP não encontrado.");
      return;
    }

    onPhoneChange(phoneVal.e164);

    onSubmit({
      customer,
      email,
      phone: phoneVal.e164,
      address: {
        street: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        number, // <–– aqui
        complement, // <–– e aqui
      },
      cartItems: items,
    });
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
      <form noValidate onSubmit={handleFormSubmit} className="space-y-6">
        <InputField
          label="Nome/Empresa"
          type="text"
          name="name"
          autoComplete="name"
          value={customer}
          onChange={(e) => onCustomerChange(e.target.value)}
          isValid={customer.trim().length >= 2}
          required
          minLength={2}
          placeholder="João da Silva / Empresa XYZ"
        />
        <InputField
          label="E-mail"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          isValid={validateEmail(email).valid}
          required
          placeholder="joao@gmail.com"
        />

        <AddressSection
          cep={cep}
          setCep={setCep}
          cepValid={cepValid}
          loadingCep={loadingCep}
          address={address}
          number={number}
          setNumber={setNumber}
          complement={complement}
          setComplement={setComplement}
        />

        <InputField
          label="Celular"
          ref={phoneRef}
          type="tel"
          autoComplete="tel"
          defaultValue={phone}
          onChange={() => {}}
          isValid={phoneValid}
          required
          placeholder="(00) 00000-0000"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#CFAF37] to-[#A8760B] hover:from-[#D4AF37] hover:to-[#B8860B] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
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
