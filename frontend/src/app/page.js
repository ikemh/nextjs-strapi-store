// src/app/page.js
"use client";

import React, { useState } from "react";
import useCategories from "@/hooks/useCategories";
import NavBar from "@/components/NavBar";
import SideDrawer from "@/components/SideDrawer";
import CartDrawer from "@/components/CartDrawer";
import CategoryTitle from "@/components/CategoryCarousel/CategoryTitle";
import ProductsSection from "@/components/ProductsSection";
import FloatingCheckoutButton from "@/components/FloatingCheckoutButton";

export default function HomePage() {
  const { categories, selectedCategory, setSelectedCategory } = useCategories();
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleSide = () => {
    // se estamos abrindo o side e o cart está aberto no mobile, fecha o cart
    if (
      !isSideOpen &&
      isCartOpen &&
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      setIsCartOpen(false);
    }
    setIsSideOpen((open) => !open);
  };

  const toggleCart = () => {
    // se estamos abrindo o cart e o side está aberto no mobile, fecha o side
    if (
      !isCartOpen &&
      isSideOpen &&
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      setIsSideOpen(false);
    }
    setIsCartOpen((open) => !open);
  };

  return (
    <div className="min-h-screen bg-[#202020] text-white pt-16">
      <NavBar onToggleDrawer={toggleSide} onToggleCart={toggleCart} />
      <SideDrawer
        isOpen={isSideOpen}
        onClose={() => setIsSideOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
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
      <FloatingCheckoutButton />
    </div>
  );
}
