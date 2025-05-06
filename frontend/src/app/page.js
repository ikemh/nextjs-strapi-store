"use client";
import React, { useState } from "react";
import useCategories from "@/hooks/useCategories";
import NavBar from "@/components/NavBar";
import SideDrawer from "@/components/SideDrawer";
import CategoryTitle from "@/components/CategoryCarousel/CategoryTitle";
import ProductsSection from "@/components/ProductsSection";

export default function HomePage() {
  const { categories, selectedCategory, setSelectedCategory } = useCategories();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#202020] text-white pt-16">
      <NavBar onToggleDrawer={() => setIsDrawerOpen((open) => !open)} />

      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Carrossel full-width, fora do padding do main */}
      <div className="w-full">
        <CategoryTitle
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      <main className="max-w-6xl mx-auto space-y-12 p-2 sm:p-6">
        <ProductsSection selectedCategory={selectedCategory} />
      </main>
    </div>
  );
}
