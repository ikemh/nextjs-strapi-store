// src/components/ProductCard/ProductCard.jsx
"use client";

import React, { useState } from "react";
import ImageZoom from "./ImageZoom";
import VariantsTable from "./VariantsTable";
import AddToCartButton from "./AddToCartButton";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, observeRef }) {
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [quantities, setQuantities] = useState(() =>
    product.variants.reduce((acc, v) => ({ ...acc, [v.sku]: 0 }), {})
  );
  const { addItem } = useCart();

  const toggleVariant = (sku) =>
    setSelectedVariants((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );

  const changeQuantity = (sku, val) =>
    setQuantities((prev) => ({ ...prev, [sku]: val }));

  const handleAddToCart = () => {
    selectedVariants.forEach((sku) => {
      const qty = quantities[sku];
      if (qty <= 0) return;
      const variant = product.variants.find((v) => v.sku === sku);
      addItem({
        id: product.id,
        sku,
        title: product.title,
        price: variant.price,
        quantity: qty,
        image: product.imageUrl,
        material: variant.material,
      });
    });

    setSelectedVariants([]);
  };
  const isDisabled =
    selectedVariants.filter((sku) => quantities[sku] > 0).length === 0;

  return (
    <div
      ref={observeRef}
      className="
        select-none bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl shadow-lg
        w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl
        mx-auto p-3 sm:p-6 flex flex-col gap-2 sm:gap-3
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

      <AddToCartButton onClick={handleAddToCart} disabled={isDisabled} />
    </div>
  );
}
