import React from "react";
import { DatePickerProps } from "./interfaces";
import "./DatePicker.scss";

function formatDateForInput(date: Date | null): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseInputToDate(value: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default function DatePicker({
  label,
  value,
  onChange,
  disabled,
}: DatePickerProps): React.ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(parseInputToDate(e.target.value));
  };

  return (
    <div className="date-picker">
      <input
        type="date"
        className="date-picker__input"
        value={formatDateForInput(value)}
        onChange={handleChange}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  );
}
