// src/utils/phoneUtils.js
// Gerencia init e validação de telefone (Brasil) usando intl-tel-input + libphonenumber-js

import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Inicializa o campo de telefone com intl-tel-input.
 * @param {{ current: HTMLInputElement }} inputRef
 * @param {(e164: string) => void} onPhoneChange
 * @returns {() => void} função de limpeza
 */
export function initPhoneInput(inputRef, onPhoneChange) {
  const inputEl = inputRef.current;
  const iti = intlTelInput(inputEl, {
    initialCountry: "br",
    onlyCountries: ["br"],
    separateDialCode: true,
    autoHideDialCode: true,
    allowDropdown: false,
    nationalMode: true,
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  // Formata enquanto digita no padrão (##) #####-####
  // Formata enquanto digita no padrão (##) #####-####
  const formatInput = () => {
    let raw = inputRef.current.value.replace(/\D/g, "");
    if (raw.startsWith("55")) raw = raw.slice(2);
    raw = raw.slice(0, 11);
    const formatted = window.intlTelInputUtils.formatNumber(
      raw,
      "BR",
      window.intlTelInputUtils.numberFormat.NATIONAL
    );
    inputRef.current.value = formatted;
    -onPhoneChange(iti.getNumber());
  };

  inputEl.addEventListener("input", formatInput);

  return () => {
    inputEl.removeEventListener("input", formatInput);
    iti.destroy();
  };
}

/**
 * Valida e retorna E.164 de telefone brasileiro.
 * @param {string} value
 * @returns {{ valid: boolean, reason?: string, e164?: string }}
 */
export function validatePhoneBR(value) {
  const phoneNumber = parsePhoneNumberFromString(value, "BR");
  if (!phoneNumber) {
    return { valid: false, reason: "Formato de telefone inválido" };
  }
  if (!phoneNumber.isValid()) {
    return { valid: false, reason: "Telefone inválido para o Brasil" };
  }
  return { valid: true, e164: phoneNumber.number };
}
