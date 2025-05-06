"use client";
import React from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "./ProductCard/ProductCard";

export default function ProductsSection({ selectedCategory }) {
  const { products, lastRef, isValidating, isReachingEnd, error } =
    useProducts(selectedCategory);

  return (
    <section className="bg-[#252525] bg-opacity-90 backdrop-blur-sm rounded-xl p-2 sm:p-6 shadow-lg">
      <div className="grid grid-cols-1 [@media_(min-width:857px)]:grid-cols-2 gap-6">
        {products.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            observeRef={idx === products.length - 1 ? lastRef : null}
          />
        ))}
      </div>

      {isValidating && <p className="text-center text-gray-500 mt-4">⟳</p>}
      {isReachingEnd && !isValidating && (
        <p className="text-center text-gray-500 mt-4">Veja mais:</p>
      )}
      {error && <p className="text-red-500">Erro ao carregar produtos.</p>}
    </section>
  );
}
