import React from "react";

export default function VariantRow({
  variant,
  checked,
  toggle,
  quantity,
  onQuantityChange,
}) {
  return (
    <tr className="odd:bg-transparent even:bg-[#272727]">
      <td className="w-[10%] pt-2 pb-0 py-0 border-t border-[#2A2A2A] text-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={toggle}
          className="h-6 w-6 accent-yellow-400 bg-[#1A1A1A] border border-[#2A2A2A] rounded"
        />
      </td>
      <td className="w-[45%] px-2 py-0 border-t border-[#2A2A2A] text-left text-md">
        {variant.material}
      </td>
      <td className="w-[20%] px-2 py-0 border-t border-[#2A2A2A] text-left text-md text-[#DADADA]">
        R$ {variant.price.toFixed(2)}
      </td>
      <td className="w-[25%] px-2 py-0 border-t border-[#2A2A2A] text-center">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onQuantityChange(parseInt(e.target.value, 10) || 1)}
          className="
            w-3/4
            bg-[#1A1A1A] border border-[#2A2A2A] rounded
            p-1 text-white text-sm
            focus:outline-none focus:ring-2 focus:ring-yellow-400
          "
        />
      </td>
    </tr>
  );
}
