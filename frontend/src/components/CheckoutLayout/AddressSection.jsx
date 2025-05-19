import React from "react";
import InputField from "./InputField";

export default function AddressSection({
  cep,
  setCep,
  cepValid,
  loadingCep,
  address,
  number,
  setNumber,
  complement,
  setComplement,
}) {
  return (
    <>
      <InputField
        label="CEP"
        type="text"
        name="postal-code"
        autoComplete="postal-code"
        value={cep.replace(/(\d{5})(\d{1,3})?/, (_, p1, p2) =>
          p2 ? `${p1}-${p2}` : p1
        )}
        onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
        isValid={cepValid}
        required
        maxLength={9}
        pattern="[0-9]{5}-[0-9]{3}"
        title="Digite um CEP no formato 00000-000"
        placeholder="00000-000"
      />

      {address.street && (
        <>
          <InputField
            label="Rua"
            value={address.street}
            readOnly
            className="text-[#bbb] font-bold pointer-events-none"
          />
          <InputField
            label="Bairro"
            value={address.neighborhood}
            readOnly
            className="text-[#AAAAAA] font-bold pointer-events-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Cidade"
              value={address.city}
              readOnly
              className="text-[#AAAAAA] font-bold pointer-events-none"
            />
            <InputField
              label="UF"
              value={address.state}
              readOnly
              className="text-[#AAAAAA] font-bold pointer-events-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Número"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              isValid={number.trim().length > 0}
              required
              placeholder="99"
            />
            <InputField
              label="Complemento"
              type="text"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              showAsterisk={false}
              placeholder="Pavilhão Esquina"
            />
          </div>
        </>
      )}
    </>
  );
}
