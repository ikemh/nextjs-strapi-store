// src/components/FloatingCheckoutButton.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationDialog from "./NotificationDialog";

export default function FloatingCheckoutButton() {
  const router = useRouter();
  const { items } = useCart();
  const {
    list: notifications,
    add: addNotification,
    clear: clearNotifications,
  } = useNotifications(7);

  // Visibilidade do botão
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(items.length > 0);
  }, [items.length]);

  // Agrupa quantidade por material (usado na validação)
  const totalsByMaterial = items.reduce((acc, item) => {
    acc[item.material] = (acc[item.material] || 0) + item.quantity;
    return acc;
  }, {});

  const handleCheckout = () => {
    clearNotifications();

    const shortages = Object.entries(totalsByMaterial)
      .filter(([_, qty]) => qty < 5)
      .map(([material, qty]) => ({ material, missing: 5 - qty }));

    if (shortages.length === 0) {
      router.push("/checkout");
    } else {
      shortages.forEach(({ material, missing }) =>
        addNotification(
          <>
            <div className="text-[0.9rem]">
              <span className="text-[#dadada]">
                Falta{missing > 1 ? "m" : ""}
              </span>{" "}
              <span className="font-bold">{missing}</span>{" "}
              <span className="text-[#dadada]">
                unidade
                {missing > 1 ? "s" : ""} de
              </span>{" "}
              <span className="font-bold">{material}</span>
            </div>
          </>
        )
      );
    }
  };

  // ** NOVO **: sempre que items mudar, se já houver
  // notifications abertas, limpa e re-popula com o estado atual
  useEffect(() => {
    if (notifications.length > 0) {
      clearNotifications();

      const shortages = Object.entries(totalsByMaterial)
        .filter(([_, qty]) => qty < 5)
        .map(([material, qty]) => ({ material, missing: 5 - qty }));

      shortages.forEach(({ material, missing }) =>
        addNotification(
          <>
            <div className="text-[0.9rem]">
              <span className="text-[#dadada]">
                Falta{missing > 1 ? "m" : ""}
              </span>{" "}
              <span className="font-bold">{missing}</span>{" "}
              <span className="text-[#dadada]">
                unidade
                {missing > 1 ? "s" : ""} de
              </span>{" "}
              <span className="font-bold">{material}</span>
            </div>
          </>
        )
      );
    }
  }, [items, clearNotifications, addNotification, notifications.length]);

  return (
    <>
      <div
        className={`
          fixed bottom-0 left-0 right-0
          grid grid-cols-12 items-center
          bg-[#1A1A1A]/80 backdrop-blur-lg
          border-t border-white/20
          px-4 py-3 z-50
          transform transition-transform duration-500 ease-out
          ${visible ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="col-span-12 flex justify-center select-none">
          <button
            onClick={handleCheckout}
            className="
              bg-gradient-to-r from-[#D4AF37] to-[#B8860B]
              hover:from-[#CFAF37] hover:to-[#A8760B]
              text-white text-lg font-semibold
              py-2 px-6 rounded-xl
              cursor-pointer
              shadow-[0_4px_0_#B8860B] hover:shadow-[0_2px_0_#A8760B]
              transform transition-all duration-200
              hover:-translate-y-1 active:translate-y-1 active:scale-95
            "
            aria-label="Finalizar Pedido"
          >
            🔪 Finalizar Pedido!
          </button>
        </div>
      </div>

      <NotificationDialog
        notifications={notifications}
        clear={clearNotifications}
      />
    </>
  );
}
