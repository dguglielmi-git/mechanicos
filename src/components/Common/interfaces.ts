import React from "react";

export interface CalendarProps {
  label: string;
  dateSelected: Date | null;
  setDateSelected: (value: Date | null) => void;
  disabled?: boolean;
}

export interface SimpleModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  body: React.ReactNode;
}

export interface ScrollingModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  content: React.ReactNode;
  btnCaption?: string;
  onContinue: () => void;
  onCancel: () => void;
  loading?: boolean;
}
