// src/hooks/useNotifications.js
"use client";

import { useState, useCallback } from "react";

export function useNotifications(max = 7) {
  const [list, setList] = useState([]);

  const add = useCallback(
    (text) => {
      setList((prev) => {
        const newNotification = {
          // gera um UUID nativo (fallback para timestamp+random se não suportado)
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random()}`,
          text,
        };
        return [...prev, newNotification].slice(-max);
      });
    },
    [max]
  );

  const clear = useCallback(() => setList([]), []);

  return { list, add, clear };
}
