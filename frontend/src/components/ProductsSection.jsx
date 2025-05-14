"use client";
import React from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "./ProductCard/ProductCard";
import { ArrowBigUpDash } from "lucide-react";

export default function ProductsSection({ selectedCategory }) {
  const { products, lastRef, isValidating, isReachingEnd, error } =
    useProducts(selectedCategory);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      {isValidating && (
        <p className="text-center text-gray-500 mt-20 h-[50vh] text-6xl select-none">
          ⟳
        </p>
      )}

      {isReachingEnd && !isValidating && (
        <button
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          className="flex items-center cursor-pointer h-[100%] justify-center mt-8 mx-auto border rounded-lg p-2 text-gray-500 select-none"
        >
          <span className="text-base font-bold text-lg mr-1">
            Voltar ao topo
          </span>
          <ArrowBigUpDash className="h-6 w-6" />
        </button>
      )}

      {error && (
        <p className="text-red-400 text-center mt-20 h-[50vh] text-2xl select-none cursor-pointer">
          Oops, algo deu errado.
        </p>
      )}
    </section>
  );
}
