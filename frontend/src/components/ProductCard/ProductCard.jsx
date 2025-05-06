"use client";
import React, { useState } from "react";
import ImageZoom from "./ImageZoom";
import VariantsTable from "./VariantsTable";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product, observeRef }) {
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [quantities, setQuantities] = useState(() =>
    product.variants.reduce((acc, v) => ({ ...acc, [v.sku]: 1 }), {})
  );

  const toggleVariant = (sku) =>
    setSelectedVariants((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );

  const changeQuantity = (sku, val) =>
    setQuantities((prev) => ({ ...prev, [sku]: val }));

  return (
    <div
      ref={observeRef}
      className="
        select-none bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl shadow-lg
        w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl
        mx-auto
        p-3 sm:p-6 flex flex-col gap-2 sm:gap-3
      "
    >
      {product.imageUrl && (
        <ImageZoom src={product.imageUrl} alt={product.title} zoom={2} />
      )}

      <h2 className="text-base sm:text-xl font-semibold text-white text-center whitespace-nowrap">
        {product.title}
      </h2>

      <VariantsTable
        variants={product.variants}
        selectedVariants={selectedVariants}
        toggleVariant={toggleVariant}
        quantities={quantities}
        changeQuantity={changeQuantity}
      />

      <AddToCartButton />
    </div>
  );
}
