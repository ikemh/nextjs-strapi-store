// src/utils/cepUtils.js

/**
 * Busca endereço a partir do CEP usando a API ViaCEP.
 * @param {string} cep - CEP com 8 dígitos (ex: "01001000")
 * @returns {Promise<{street: string, neighborhood: string, city: string, state: string}>}
 */
export async function fetchAddressByCEP(cep) {
  const sanitized = cep.replace(/\D/g, "");
  if (sanitized.length !== 8) {
    throw new Error("CEP deve ter 8 dígitos.");
  }
  const res = await fetch(`https://viacep.com.br/ws/${sanitized}/json/`);
  if (!res.ok) {
    throw new Error("Erro ao buscar CEP.");
  }
  const data = await res.json();
  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }
  return {
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.uf,
  };
}
