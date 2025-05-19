import React, { useState, forwardRef } from "react";

const InputField = forwardRef(
  (
    {
      label,
      value,
      onChange,
      showAsterisk = true,
      isValid = null, // true | false | null (sem validação)
      className = "",
      ...props
    },
    ref
  ) => {
    const [touched, setTouched] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => {
      setFocused(false);
      setTouched(true);
    };

    const baseClasses =
      "w-full p-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37] placeholder-gray-400/13";
    const defaultState = "bg-[#1A1A1A] text-white border border-[#2A2A2A]";
    const validState =
      "bg-green-300/5 text-[#bbb] font-bold border border-green-500/20";
    const invalidState = "bg-red-300/5 border border-red-500/40";

    let stateClasses = defaultState;
    if (touched && !focused && isValid !== null) {
      stateClasses = isValid ? validState : invalidState;
    }

    return (
      <div>
        <label
          className={`block mb-2 text-sm text-[#DADADA] font-bold ${
            showAsterisk
              ? "after:content-['*'] after:ml-1 after:text-red-500/30"
              : "after:content-['(opcional)'] after:ml-1 after:text-[0.75rem] after:text-[#DADADA]/35"
          }`}
        >
          {label}
        </label>
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${baseClasses} ${stateClasses} ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export default InputField;
