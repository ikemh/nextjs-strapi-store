// src/context/ProductSelectionContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

// Criando o contexto
const ProductSelectionContext = createContext();

// Hook personalizado para facilitar o uso do contexto
export function useProductSelection() {
  return useContext(ProductSelectionContext);
}

// Provedor do contexto
export function ProductSelectionProvider({ children }) {
  const [selectedVariants, setSelectedVariants] = useState([]);

  // Adiciona uma variante à seleção
  const addVariant = (variantId) => {
    setSelectedVariants((prev) => {
      if (!prev.includes(variantId)) {
        return [...prev, variantId];
      }
      return prev;
    });
  };

  // Remove uma variante da seleção
  const removeVariant = (variantId) => {
    setSelectedVariants((prev) => prev.filter((id) => id !== variantId));
  };

  // Verifica se há variantes selecionadas
  const hasSelectedVariants = () => {
    return selectedVariants.length > 0;
  };

  // Valor do contexto
  const value = {
    selectedVariants,
    addVariant,
    removeVariant,
    hasSelectedVariants,
  };

  return (
    <ProductSelectionContext.Provider value={value}>
      {children}
    </ProductSelectionContext.Provider>
  );
}
