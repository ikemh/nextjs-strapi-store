// src/context/CartContext.jsx
"use client";
import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD_ITEM": {
      const { sku, quantity, ...rest } = action.payload;
      const exists = state.items.find((item) => item.sku === sku);
      if (exists) {
        return {
          items: state.items.map((item) =>
            item.sku === sku
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, { sku, quantity, ...rest }] };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.sku !== action.payload.sku),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // inicializa do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) dispatch({ type: "INIT", payload: JSON.parse(stored) });
  }, []);

  // persiste no localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (sku) =>
    dispatch({ type: "REMOVE_ITEM", payload: { sku } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
