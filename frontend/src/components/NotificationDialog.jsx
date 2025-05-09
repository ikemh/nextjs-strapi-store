// src/components/NotificationDialog.jsx
"use client";

import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function NotificationDialog({ notifications, clear }) {
  if (!notifications.length) return null;

  return createPortal(
    <div className="fixed bottom-20 w-80 left-1/2 transform -translate-x-1/2 z-50">
      <div className="max-w-md bg-[#1A1A1A]/70 backdrop-blur-lg text-white rounded-lg border border-white/20 shadow-lg overflow-hidden">
        {/* Cabeçalho fixo */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/20">
          <span className="text-[1rem] font-semibold">
            ⚠️ &nbsp;Pedido Mínimo
          </span>
          <button onClick={clear} aria-label="Fechar" className="p-1">
            <X className="cursor-pointer h-6 w-6" />
          </button>
        </div>

        {/* Lista completa sempre visível */}
        <div className="px-4 py-2 space-y-1 text-xs">
          {notifications.map((n, index) => (
            <div key={`${n.id}-${index}`} className="flex items-start">
              <span className="mr-2">•</span>
              <span className="flex-1">{n.text}</span>
            </div>
          ))}
          <div className="mt-2 text-yellow-300">
            * Apenas o material conta. Modelo não interfere.
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
