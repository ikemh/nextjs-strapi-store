// hooks/usePhoneInput.js
import { useState, useRef, useEffect } from "react";
import {
  initPhoneInput,
  validatePhoneBR,
} from "@/components/CheckoutLayout/utils/phoneUtils";

export function usePhoneInput(onChange) {
  const ref = useRef(null);
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = initPhoneInput(ref, onChange);
    return cleanup;
  }, [onChange]);

  useEffect(() => {
    const val = ref.current?.value || "";
    setValid(validatePhoneBR(val).valid);
  }, [ref.current?.value]);

  return { ref, valid };
}
