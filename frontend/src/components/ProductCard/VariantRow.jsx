// src/components/ProductCard/VariantRow.jsx
import React from "react";

export default function VariantRow({
  variant,
  checked,
  toggle,
  quantity,
  onQuantityChange,
}) {
  const handleQtyChange = (raw) => {
    // só dígitos, até 3 chars
    const digits = String(raw).replace(/\D/g, "").slice(0, 3);
    // remove zeros à esquerda, mas deixa "0" se tudo for zero
    const clean = digits.replace(/^0+/, "") || "0";
    const num = Math.min(999, parseInt(clean, 10));
    onQuantityChange(num);
    // auto-toggle checkbox
    if (num > 0 && !checked) toggle();
    if (num === 0 && checked) toggle();
  };

  const decrement = () => handleQtyChange(quantity - 1);
  const increment = () => handleQtyChange(quantity + 1);
  const handleInput = (e) => handleQtyChange(e.target.value);

  // ajusta font-size conforme dígitos
  const len = String(quantity).length;
  const fontSize = len === 1 ? "1rem" : len === 2 ? "0.9rem" : "0.8rem";

  return (
    <tr className="odd:bg-transparent even:bg-[#272727]">
      {/* Checkbox */}
      <td className="w-[10%] pt-2 pb-0 border-t border-[#2A2A2A] text-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={toggle}
          className="h-6 w-6 accent-yellow-400 bg-[#1A1A1A] border border-[#2A2A2A] rounded"
        />
      </td>

      {/* Material */}
      <td className="w-[45%] px-2 py-0 border-t border-[#2A2A2A] text-left font-bold">
        {variant.material}
      </td>

      {/* Preço */}
      <td className="w-[20%] px-2 py-0 border-t border-[#2A2A2A] text-left text-[#D0D0D0]">
        R$ {variant.price.toFixed(2)}
      </td>

      {/* Quantidade */}
      <td className="w-[25%] px-2 py-0 border-t border-[#2A2A2A] text-center">
        <div className="inline-flex items-center border border-[#2A2A2A] bg-[#1A1A1A] rounded">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity <= 0}
            className="
              h-6 w-6 flex items-center justify-center
              text-white font-bold
              border-r border-[#2A2A2A]
              disabled:opacity-50 disabled:hover:bg-[#1A1A1A]
              hover:bg-[#272727]
            "
          >
            –
          </button>

          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={quantity}
            onChange={handleInput}
            maxLength={3}
            style={{ fontSize }}
            className={
              `w-8 h-6 bg-transparent text-center font-mono p-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 ` +
              (quantity > 0 ? "text-[#DADADA]" : "text-[gray]/30")
            }
          />

          <button
            type="button"
            onClick={increment}
            disabled={quantity >= 999}
            className="
              h-6 w-6 flex items-center justify-center
              text-white font-bold
              border-l border-[#2A2A2A]
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:bg-[#272727]
            "
          >
            +
          </button>
        </div>
      </td>
    </tr>
  );
}
