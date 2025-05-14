// src/utils/emailUtils.js
// Sintaxe + blacklist de domínios descartáveis e suspeitos

import validator from "validator";
import disposableDomains from "disposable-email-domains";

const extraBlacklist = [
  "scammer.com",
  "spamdomain.io",
  "fraud.net",
  // adicione aqui outros domínios de golpistas
];

const blacklist = new Set([...disposableDomains, ...extraBlacklist]);

/**
 * Valida sintaxe e bloqueia domínios indesejados.
 * @param {string} email
 * @returns {{ valid: boolean, reason?: string }}
 */
export function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return { valid: false, reason: "Formato de e-mail inválido" };
  }
  const domain = email.split("@")[1].toLowerCase();
  if (blacklist.has(domain)) {
    return { valid: false, reason: "Domínio de e-mail não permitido" };
  }
  return { valid: true };
}
