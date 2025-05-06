"use client";
import React, { useEffect, useRef } from "react";
import { Stardos_Stencil } from "next/font/google";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const stencil = Stardos_Stencil({ subsets: ["latin"], weight: "700" });

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

  return (
    <div className="flex flex-col items-center mt-12 pb-8 select-none">
      {/* Título com degradê e contorno */}
      <h2
        className={`text-5xl ${anton.className} uppercase mb-6 pt-3 pb-3 text-[#ddd] tracking-wide text-center`}
        style={{
          textShadow: `
      2px 2px 0 rgba(0,0,0,0.7),
      -1px -1px 0 rgba(255,255,255,0.15),
      0 0 8px rgba(255,255,255,0.2)
    `,
        }}
      >
        CATÁLOGO
        <br />
        <span className="block text-2xl text-[#aaa] font-normal tracking-normal leading-tight mt-1">
          2025
        </span>
      </h2>

      <div
        ref={containerRef}
        tabIndex={0}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        className="flex space-x-3 overflow-x-auto w-full px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((cat, i) => {
          const isActive = cat === selectedCategory;
          return (
            <div
              key={cat}
              ref={(el) => (itemsRef.current[i] = el)}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 rounded-md min-w-[12rem] sm:min-w-[14rem] md:min-w-[15rem] ${
                isActive
                  ? "scale-100 opacity-80"
                  : "scale-95 opacity-70 hover:scale-100 hover:opacity-90"
              }`}
              onClick={() => onSelectCategory(cat)}
            >
              {/* Camada metálica com efeito 3D */}
              <div
                className={`absolute inset-0 rounded-md ${
                  isActive ? "brightness-110" : ""
                }`}
                style={{
                  backgroundImage: `
                    linear-gradient(145deg, #d0d0d0, #909090),
                    repeating-linear-gradient(
                      45deg,
                      #c0c0c0 0px,
                      #e0e0e0 2px,
                      #c0c0c0 4px
                    )
                  `,
                  backgroundBlendMode: "overlay",
                  backgroundSize: "cover",
                  boxShadow: `
                    inset 2px 2px 5px rgba(255,255,255,0.3),
                    inset -2px -2px 5px rgba(0,0,0,0.4),
                    2px 2px 8px rgba(0,0,0,0.5)
                  `,
                }}
              />

              {/* Conteúdo do botão */}
              <div
                className={`relative z-10 px-6 py-3 text-center rounded-md border transition-all duration-200 ${
                  isActive
                    ? "border-[#f0f0f080] shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    : "border-[#444]"
                } hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]`}
              >
                <h2
                  className={`${stencil.className} text-base sm:text-lg md:text-xl uppercase font-extrabold text-transparent bg-clip-text`}
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        135deg,
                        #a0a0a0 0px,
                        #d0d0d0 1px,
                        #a0a0a0 2px
                      ),
                      linear-gradient(135deg, rgba(2, 2, 2, 0.5), rgba(0,0,0,0.1))
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
