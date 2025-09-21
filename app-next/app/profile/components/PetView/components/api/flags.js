"use client";

import { countries } from "./countries";

import Select from "react-select";
import Image from "next/image";

const options = countries.map((country) => ({
  value: country.code,
  label: (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Image src={`https://flagpedia.net/data/flags/w580/${country.code.toLowerCase()}.webp`} alt={country.name} height={15} width={0} style={{ width: "auto" }} />
      <span>{country.name}</span>
    </div>
  ),
}));

export default function CountrySelect({ value, onChange, placeholder = `${value}` }) {
  const selected = options.find((option) => option.value === (value ?? "")) ?? null;
  return (
    <Select
      instanceId="country-select"
      options={options}
      value={selected}
      placeholder={placeholder}
      isClearable
      onChange={(option) => onChange?.(option ? option.value : "")}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 15 }) }}
    />
  );
}
