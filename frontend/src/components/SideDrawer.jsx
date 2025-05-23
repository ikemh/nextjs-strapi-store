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
      className={`z-40 fixed inset-0 ${isOpen ? "" : "pointer-events-none"}`}
      onClick={onClose}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`
          fixed top-[8vh] left-0
          h-[100%] w-30 min-w-[25vh] max-w-[10rem] 
          bg-[#1A1A1A]/70 backdrop-blur-lg
          border-r border-white/10
          origin-left transform transition-transform duration-350 md:top-[10vh] min-w-[30vh]
          ${isOpen ? "scale-x-100" : "scale-x-0"}
        `}
      >
        <button
          onClick={onClose}
          aria-label="Fechar menu"
          className="cursor-pointer absolute top-[1vh] right-[1vh] text-white text-[4vh] focus:outline-none"
        >
          ×
        </button>

        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="mt-[6vh] pl-[1vh] pr-[3vh] pb-[20vh] scroll-smooth font-roboto"
        >
          <nav className="space-y-[0.5vh] ">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  onClose();
                }}
                className={`
                  w-full h-[6vh] text-left py-[1vh] pl-[1vh] text-[2.5vh]
                  cursor-pointer
                  border-b-[0.1vh] border-[#60606050] last:border-none
                  transition-transform duration-200
                  ${
                    cat === selectedCategory
                      ? "bg-[#D4AF37]  font-bold text-[#1a1a1a]"
                      : "text-[#bbbbbb] hover:text-white hover:translate-x-2"
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
