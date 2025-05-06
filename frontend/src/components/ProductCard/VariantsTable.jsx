import React from "react";
import VariantRow from "./VariantRow";

export default function VariantsTable({
  variants,
  selectedVariants,
  toggleVariant,
  quantities,
  changeQuantity,
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#2A2A2A]">
      <table
        className="
          w-full
          text-[#B3B3B3]
          table-auto
          border-separate border-spacing-0
        "
      >
        <thead className="bg-[#2A2A2A]">
          <tr>
            <th className="w-[5%] px-2 py-1 text-center text-md font-bold" />
            <th className="w-[40%] px-2 py-1 text-left text-md font-bold">
              Material
            </th>
            <th className="w-[25%] px-2 py-1 text-left text-md font-bold">
              Preço
            </th>
            <th className="w-[20%] px-2 py-1 text-center text-md font-bold">
              Qtde.
            </th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v, i) => (
            <VariantRow
              key={v.sku}
              variant={v}
              checked={selectedVariants.includes(v.sku)}
              toggle={() => toggleVariant(v.sku)}
              quantity={quantities[v.sku]}
              onQuantityChange={(val) => changeQuantity(v.sku, val)}
              // adiciona classes especiais no último row para garantir os cantos
              className={`
                ${i % 2 === 0 ? "bg-[#1E1E1E]" : ""}
                ${i === variants.length - 1 ? "last:rounded-bl-lg last:rounded-br-lg" : ""}
              `}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
