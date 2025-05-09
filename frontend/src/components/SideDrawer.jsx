// SideDrawer.jsx
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
          h-[calc(100%)]
          w-55
          bg-[#2A2A2A]/95 backdrop-blur-lg
          border-r border-white/20
          origin-left transform transition-all duration-300
          ${isOpen ? "scale-x-100" : "scale-x-0"}
        `}
      >
        <button
          onClick={onClose}
          aria-label="Fechar menu"
          className="cursor-pointer absolute top-[0.2rem] right-2 text-white text-2xl focus:outline-none"
        >
          ×
        </button>

        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="mt-8 px-4 pl-0 pb-40 scroll-smooth font-roboto"
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
                      ? "bg-[#B8860B] font-semibold text-white"
                      : "text-[#D3D3D3] hover:text-white hover:translate-x-2"
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
