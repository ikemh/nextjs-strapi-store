// src/components/CategoryCarousel/CategoryTile.jsx
"use client";
import React from "react";
import { Stardos_Stencil } from "next/font/google";

const stencil = Stardos_Stencil({ subsets: ["latin"], weight: "700" });

const CategoryTile = React.forwardRef(
  ({ category, isActive, onClick }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      className={`
      relative flex-shrink-0
      w-36 sm:w-44 md:w-52
      h-12 sm:h-14 md:h-16
      cursor-pointer
      transition-transform duration-300
      ${isActive ? "scale-100 opacity-100" : "scale-75 opacity-50"}
    `}
    >
      {/* Chapa de aço metálica */}
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
          linear-gradient(135deg, rgba(2,2,2,0.8), rgba(0,0,0,0.1))
        `,
          backgroundBlendMode: "overlay",
          backgroundSize: "100% 2px, 200% 200%",
        }}
      />
      {/* Texto da categoria */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <h2
          className={`
          ${stencil.className}
          text-sm sm:text-base md:text-lg
          uppercase font-extrabold
          text-transparent bg-clip-text
          text-center
          whitespace-nowrap
        `}
          style={{
            backgroundImage: `
            repeating-linear-gradient(
              135deg,
              #bababa 0px,
              #cacaca 1px,
              #dadada 2px
            ),
            linear-gradient(135deg, rgba(2,2,2,0.6), rgba(0,0,0,0.1))
          `,
            backgroundBlendMode: "overlay",
            backgroundSize: "100% 2px, 200% 200%",
          }}
        >
          {category}
        </h2>
      </div>
    </div>
  )
);

export default CategoryTile;
