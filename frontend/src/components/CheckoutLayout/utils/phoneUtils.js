import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Formata número nacional brasileiro progressivamente.
 * Ex: 11912345678 → (11) 91234-5678
 */
export function formatPhoneBR(raw) {
  if (raw.length === 0) return "";
  if (raw.length <= 2) return `(${raw}`;
  if (raw.length <= 6) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
  if (raw.length <= 10)
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
  return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
}

/**
 * Inicializa o campo de telefone: formatação, validação e emissão.
 * @param {{ current: HTMLInputElement }} inputRef
 * @param {(e164: string) => void} onPhoneChange
 * @param {(valid: boolean) => void} [setPhoneValid]
 * @returns {() => void} cleanup
 */
export function initPhoneInput(inputRef, onPhoneChange, setPhoneValid) {
  const inputEl = inputRef.current;

  const handleInput = () => {
    if (!inputEl) return;

    // Entrada bruta (pode vir com +55, espaços, traços, etc.)
    let inputValue = inputEl.value;
    let digits = inputValue.replace(/\D/g, "");

    // Remove DDI +55 se exceder 11 dígitos
    if (digits.startsWith("55") && digits.length > 11) {
      digits = digits.slice(2);
    }

    // Garante no máximo 11 dígitos
    const limited = digits.slice(0, 11);

    // Atualiza campo com máscara nacional
    const formatted = formatPhoneBR(limited);
    inputEl.value = formatted;

    // Validação + conversão para E.164
    const parsed = parsePhoneNumberFromString(`+55${limited}`, "BR");
    const isValid = parsed?.isValid() || false;
    const e164 = parsed?.number || "";

    onPhoneChange(e164);
    if (setPhoneValid) setPhoneValid(isValid);
  };

  inputEl.addEventListener("input", handleInput);
  inputEl.addEventListener("change", handleInput); // cobre autocomplete

  return () => {
    inputEl.removeEventListener("input", handleInput);
    inputEl.removeEventListener("change", handleInput);
  };
}

/**
 * Valida e retorna número E.164 de um telefone brasileiro.
 * @param {string} value - número no formato E.164
 * @returns {{ valid: boolean, reason?: string, e164?: string }}
 */
export function validatePhoneBR(value) {
  const phoneNumber = parsePhoneNumberFromString(value, "BR");
  if (!phoneNumber) {
    return { valid: false, reason: "Formato de telefone inválido" };
  }

  const national = phoneNumber.nationalNumber || "";
  if (national.length < 10) {
    return { valid: false, reason: "Telefone incompleto" };
  }

  if (!phoneNumber.isValid()) {
    return { valid: false, reason: "Telefone inválido para o Brasil" };
  }

  return { valid: true, e164: phoneNumber.number };
}
