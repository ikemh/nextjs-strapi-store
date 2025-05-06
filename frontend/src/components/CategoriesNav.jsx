"use client";
import React from "react";

export default function CategoriesNav({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <nav className="hidden md:block fixed top-1/3 right-6 bg-[#1A1A1A] bg-opacity-80 p-4 rounded-lg shadow-lg z-50">
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onSelectCategory(cat)}
              className={`text-sm ${
                cat === selectedCategory
                  ? "text-white font-bold"
                  : "text-[#B3B3B3] hover:text-white"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
