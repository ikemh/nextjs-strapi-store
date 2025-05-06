"use client";
import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function SideDrawer({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div
      className={`fixed top-16 left-0 right-0 bottom-0 z-40 ${
        isOpen ? "" : "pointer-events-none"
      }`}
      onClick={onClose}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`
          fixed top-16 left-0
          h-[calc(100%-4rem)]
          w-64
          bg-[#1A1A1A]/70 backdrop-blur-lg
          origin-left transform transition-all duration-300
          ${isOpen ? "scale-x-100" : "scale-x-0"}
        `}
      >
        <button
          onClick={onClose}
          aria-label="Fechar menu"
          className="absolute top-2 right-2 text-white text-xl focus:outline-none"
        >
          ×
        </button>

        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="mt-8 px-4 pb-10 scroll-smooth font-roboto"
        >
          <nav className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  onClose();
                }}
                className={`
                w-full text-left py-2 px-3
                cursor-pointer
                border-b border-[#60606050] last:border-none
                transition-transform duration-200
                ${
                  cat === selectedCategory
                    ? "bg-yellow-600 font-semibold text-white"
                    : "text-[#B3B3B3] hover:text-white hover:translate-x-2"
                }
              `}
              >
                {cat}
              </button>
            ))}
          </nav>
        </SimpleBar>
      </aside>
    </div>
  );
}
