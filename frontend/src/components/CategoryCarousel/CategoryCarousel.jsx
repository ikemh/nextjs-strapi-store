"use client";
import React, { useEffect, useRef } from "react";
import { Stardos_Stencil } from "next/font/google";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const stencil = Stardos_Stencil({ subsets: ["latin"], weight: "700" });

/**
 * Carrossel de categorias com estilização original,
 * padding interno adequado e espaçamento original,
 * padding adicional à esquerda e margem superior:
 * - Padding horizontal interno px-4
 * - Espaçamento entre placas space-x-6
 * - Margin-top mt-6 para distanciar do menu
 * - Padding-left pl-6 para espaçamento extra
 */
export default function CategoryTitle({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.style.scrollBehavior = "smooth";
    c.style.msOverflowStyle = "none";
    c.style.scrollbarWidth = "none";
  }, []);

  useEffect(() => {
    const c = containerRef.current;
    const idx = categories.indexOf(selectedCategory);
    const item = itemsRef.current[idx];
    if (c && item) {
      const cr = c.getBoundingClientRect();
      const ir = item.getBoundingClientRect();
      const offset = ir.left - cr.left - (cr.width / 2 - ir.width / 2);
      c.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [selectedCategory, categories]);

  const handleWheel = (e) => {
    e.preventDefault();
    containerRef.current?.scrollBy({ left: e.deltaY, behavior: "smooth" });
  };

  const handleKeyDown = (e) => {
    const idx = categories.indexOf(selectedCategory);
    if (e.key === "ArrowRight" && idx < categories.length - 1) {
      onSelectCategory(categories[idx + 1]);
    } else if (e.key === "ArrowLeft" && idx > 0) {
      onSelectCategory(categories[idx - 1]);
    }
  };
  <div className="flex flex-col items-center mt-12 pb-8 select-none">
    <h2
      className={`text-6xl ${anton.className} uppercase mb-6 pt-10 pb-5 bg-gradient-to-r from-[#dddddd90] via-[#aaaaaa] to-[#dddddd90] text-transparent bg-clip-text`}
      style={{
        WebkitTextStroke: "3px #00000090",
        WebkitBackgroundClip: "text",
      }}
    >
      CATÁLOGO
    </h2>
  </div>;
  return (
    <div className="flex justify-center mt-12 pl-8 pb-8">
      <div
        ref={containerRef}
        tabIndex={0}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        className="flex space-x-6 overflow-x-auto w-full px-4"
      >
        {categories.map((cat, i) => {
          const isActive = cat === selectedCategory;
          return (
            <div
              key={cat}
              ref={(el) => (itemsRef.current[i] = el)}
              onClick={() => onSelectCategory(cat)}
              className={`relative inline-block flex-shrink-0 cursor-pointer transition-transform duration-300 ${
                isActive ? "scale-100 opacity-100" : "scale-75 opacity-50"
              }`}
            >
              {/* Placa metálica */}
              <div
                className="absolute inset-0 rounded-lg shadow-inner"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      #a0a0a0 0px,
                      #b8b8b8 1px,
                      #a0a0a0 2px
                    ),
                    linear-gradient(135deg, rgba(2, 2, 2, 0.8), rgba(0,0,0,0.1))
                  `,
                  backgroundBlendMode: "overlay",
                  backgroundSize: "100% 2px, 200% 200%",
                }}
              />
              <div className="relative z-10 px-8 py-4 rounded-lg bg-transparent border border-[#404040]">
                <h2
                  className={`${stencil.className} text-3xl sm:text-4xl md:text-5xl uppercase font-extrabold text-transparent bg-clip-text`}
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        135deg,
                        #a0a0a0 0px,
                        #b8b8b8 1px,
                        #a0a0a0 2px
                      ),
                      linear-gradient(135deg, rgba(2, 2, 2, 0.6), rgba(0,0,0,0.1))
                    `,
                    backgroundBlendMode: "overlay",
                    backgroundSize: "100% 2px, 200% 200%",
                  }}
                >
                  {cat}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
