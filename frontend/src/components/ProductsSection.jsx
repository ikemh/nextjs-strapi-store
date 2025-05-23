// components/ProductsSection.jsx - ATUALIZADO
"use client";
import React, { useState, useEffect } from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "./ProductCard/ProductCard";
import CategoryChangeIndicator from "./CategoryChangeIndicator";
import { ArrowBigUpDash } from "lucide-react";

export default function ProductsSection({ selectedCategory }) {
  const {
    products,
    lastRef,
    isValidating,
    isReachingEnd,
    error,
    categoryInfo = {}, // ✅ FALLBACK para compatibilidade
  } = useProducts(selectedCategory);

  // ✅ CONTROLE DE RENDERIZAÇÃO GRADUAL (mantido)
  const [visibleCount, setVisibleCount] = useState(4);
  const [isRendering, setIsRendering] = useState(false);

  const BATCH_SIZE = 4;
  const RENDER_DELAY = 800;

  // ✅ Reset quando categoria ATIVA muda (com fallback)
  useEffect(() => {
    setVisibleCount(4);
    setIsRendering(false);
  }, [categoryInfo.active || selectedCategory]); // Fallback para selectedCategory

  // ✅ Observer para renderizar mais cards (mantido)
  useEffect(() => {
    if (!products.length || visibleCount >= products.length || isRendering)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isRendering) {
            setIsRendering(true);

            setTimeout(() => {
              setVisibleCount((prev) =>
                Math.min(prev + BATCH_SIZE, products.length)
              );
              setIsRendering(false);
            }, RENDER_DELAY);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "200px",
      }
    );

    const penultimateIndex = Math.max(0, visibleCount - 2);
    const penultimateCard = document.querySelector(
      `[data-product-index="${penultimateIndex}"]`
    );

    if (penultimateCard) {
      observer.observe(penultimateCard);
    }

    return () => observer.disconnect();
  }, [products.length, visibleCount, isRendering, BATCH_SIZE]);

  const visibleProducts = products.slice(0, visibleCount);
  const hiddenCount = products.length - visibleCount;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ✅ INDICADOR DE MUDANÇA DE CATEGORIA (com verificação) */}
      {categoryInfo.isChanging && (
        <CategoryChangeIndicator
          isChanging={categoryInfo.isChanging}
          requestedCategory={categoryInfo.requested || selectedCategory}
          activeCategory={categoryInfo.active || selectedCategory}
        />
      )}

      <section className="bg-[#252525] bg-opacity-90 backdrop-blur-sm rounded-xl p-2 sm:p-6 shadow-lg">
        <div className="grid grid-cols-1 [@media_(min-width:857px)]:grid-cols-2 gap-6">
          {visibleProducts.map((product, idx) => (
            <div
              key={product.id}
              data-product-index={idx}
              className="transition-opacity duration-500 ease-in-out"
            >
              <ProductCard
                product={product}
                observeRef={idx === products.length - 1 ? lastRef : null}
              />
            </div>
          ))}
        </div>

        {/* Indicadores de carregamento */}
        {hiddenCount > 0 && !isValidating && (
          <div className="text-center mt-8">
            {isRendering ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-[#555] border-t-[#D4AF37] rounded-full animate-spin"></div>
                <span className="text-[#888] text-sm">Carregando...</span>
              </div>
            ) : (
              <div className="text-[#666] text-sm">
                {hiddenCount} produtos aguardando renderização
              </div>
            )}
          </div>
        )}

        {isReachingEnd && !isValidating && hiddenCount === 0 && (
          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="flex items-center cursor-pointer h-[100%] mb-10 justify-center mt-8 mx-auto border rounded-lg p-2 text-gray-500 select-none"
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
    </>
  );
}
