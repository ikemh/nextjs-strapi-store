// src/context/NotificationsContext.jsx
"use client";

import React, { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (text) =>
    setNotifications((prev) => [...prev, { id: Date.now(), text }]);

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, clearNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationsContext);
