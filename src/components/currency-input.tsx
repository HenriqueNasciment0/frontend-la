import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const CurrencyInput: React.FC<{
  id: string;
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
}> = ({ id, value, className, onChange }) => {
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    if (value) {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue) {
        const numberValue = parseFloat(numericValue) / 100;
        const formatted = numberValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        });
        setFormattedValue(formatted);
      } else {
        setFormattedValue("");
      }
    } else {
      setFormattedValue("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    if (numericValue === "") {
      setFormattedValue("");
      if (onChange) {
        onChange("");
      }
      return;
    }

    const numberValue = parseFloat(numericValue) / 100;
    const formatted = numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    setFormattedValue(formatted);

    if (onChange) {
      onChange(numericValue);
    }
  };

  return (
    <Input
      id={id}
      value={formattedValue}
      onChange={handleChange}
      className={className}
    />
  );
};

export default CurrencyInput;
