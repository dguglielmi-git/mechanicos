import { RefObject } from "react";

export interface BudgetItem {
  id: string;
  quantity: number;
  description: string;
  price: number;
  subtotal: number;
}

export interface TmpBudget {
  id?: string;
  client: string;
  address: string;
  city: string;
  vehicle: string;
  brand: string;
  plate: string;
  items?: BudgetItem[];
}

export type BudgetDataParam =
  | "client"
  | "address"
  | "city"
  | "vehicle"
  | "brand"
  | "plate";

export interface BudgetContextValue {
  branch: number;
  setBranch: (value: number) => void;
  sequence: number;
  setSequence: (value: number) => void;
  client: string;
  setClient: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  vehicle: string;
  setVehicle: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  plate: string;
  setPlate: (value: string) => void;
  printed: boolean;
  setPrinted: (value: boolean) => void;
  stored: boolean;
  setStored: (value: boolean) => void;
  disable: boolean;
  setDisable: (value: boolean) => void;
  issueDateSelected: Date | null;
  setIssueDateSelected: (value: Date | null) => void;
  items: BudgetItem[];
  setItems: (value: BudgetItem[]) => void;
  totalAmount: number;
  setTotalAmount: (value: number) => void;
  inputQuantity: number;
  setInputQuantity: (value: number) => void;
  inputDesc: string;
  setInputDesc: (value: string) => void;
  inputPrice: number;
  setInputPrice: (value: number) => void;
  descRef: RefObject<HTMLInputElement | null>;
  priceRef: RefObject<HTMLInputElement | null>;
  pdfRef: RefObject<HTMLDivElement | null>;
  componentRef: RefObject<HTMLDivElement | null>;
  budgetList: unknown;
  loadingBudgets: boolean;
  refetchBudgets: () => void;
  cleanFields: () => void;
  validateCompletionFields: () => boolean;
  handlePrint: () => void;
  getBudgetData: (param: BudgetDataParam) => string;
  getFinalBudget: () => Promise<{
    client: string;
    address: string;
    city: string;
    vehicle: string;
    brand: string;
    plate: string;
    issueDate: Date | null;
    items: BudgetItem[];
  }>;
  updateBudgetNumbers: () => Promise<void>;
  refetchBudget: () => void;
}
