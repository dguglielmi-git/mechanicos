import React from "react";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import "primeflex/primeflex.css";
import { CalendarProps } from "./interfaces";

export default function IconCalendar({
  label,
  dateSelected,
  setDateSelected,
  disabled,
  className,
}: CalendarProps): React.ReactElement {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = prevMonth === 11 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = nextMonth === 0 ? year + 1 : year;

  const minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  const maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Claro",
    dateFormat: "dd/mm/yy",
  });

  return (
    <div
      className={className ? `p-field ${className}` : "p-field"}
      style={className ? undefined : { marginBottom: "5px" }}
    >
      <Calendar
        id="icon"
        value={dateSelected ?? undefined}
        placeholder={label}
        onChange={(e) => {
          const val = e.value;
          setDateSelected(
            Array.isArray(val) ? (val[0] ?? null) : (val ?? null)
          );
        }}
        showIcon
        disabled={disabled}
        locale="es"
      />
    </div>
  );
}
