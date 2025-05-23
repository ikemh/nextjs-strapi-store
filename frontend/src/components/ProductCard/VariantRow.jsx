// src/components/ProductCard/VariantRow.jsx
import React from "react";

export default function VariantRow({
  variant,
  checked,
  toggle,
  quantity,
  onQuantityChange,
}) {
  const handleToggle = () => {
    if (!checked && quantity === 0) {
      onQuantityChange(1);
    }
    toggle();
  };

  const handleQtyChange = (raw) => {
    // só dígitos, até 3 chars
    const digits = String(raw).replace(/\D/g, "").slice(0, 3);
    // remove zeros à esquerda, mas deixa "0" se tudo for zero
    const clean = digits.replace(/^0+/, "") || "0";
    const num = Math.min(999, parseInt(clean, 10));
    onQuantityChange(num);
    // apenas ativa o checkbox se quantidade > 0
    if (num > 0 && !checked) toggle();
    if (num === 0 && checked) toggle(); // Se quantidade = 0 e checkbox marcado, desmarca
  };

  const decrement = () => handleQtyChange(quantity - 1);
  const increment = () => handleQtyChange(quantity + 1);
  const handleInput = (e) => handleQtyChange(e.target.value);

  // ajusta font-size conforme dígitos
  const len = String(quantity).length;
  const fontSize = len === 1 ? "1rem" : len === 2 ? "0.9rem" : "0.8rem";

  return (
    <tr className="odd:bg-transparent even:bg-[#1f1f1f]">
      {/* Checkbox */}
      <td className="w-[10%] pt-2 pb-0 border-t border-[#00000040] text-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="h-6 w-6 accent-[#D4AF37] bg-[#1A1A1A] border border-[#00000040] rounded"
        />
      </td>

      {/* Material */}
      <td
        className="w-[45%] px-2 py-0 border-t border-[#00000040] text-left text-[#DADADA] font-bold cursor-pointer"
        onClick={handleToggle}
      >
        {variant.material}
      </td>

      {/* Preço */}
      <td className="w-[20%] px-2 py-0 border-t border-[#00000040] text-left text-[#EAEAEA]">
        R$ {variant.price.toFixed(2)}
      </td>

      {/* Quantidade */}
      <td className="w-[25%] px-2 py-0 border-t border-[#00000040] text-center">
        <div className="inline-flex items-center border border-[#00000040] bg-[#1A1A1A] rounded">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity <= 0}
            className="
              h-6 w-6 flex items-center justify-center
              text-white font-bold rounded-none
              border-r border-[#2A2A2A] cursor-pointer
              disabled:opacity-10 disabled:hover:bg-[#1A1A1A] disabled:pointer-events-none
              hover:bg-[#3a3a3a] hover:rounded
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
              `w-8 h-6 bg-transparent text-center p-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 ` +
              (quantity > 0 ? "text-[#DADADA]" : "text-[gray]/30")
            }
          />

          <button
            type="button"
            onClick={increment}
            disabled={quantity >= 999}
            className="
              h-6 w-6 flex items-center justify-center cursor-pointer
              text-white font-bold rounded-none
              border-l border-[#2A2A2A]
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:bg-[#272727] hover:rounded
            "
          >
            +
          </button>
        </div>
      </td>
    </tr>
  );
}
