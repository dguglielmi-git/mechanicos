import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { useReactToPrint } from "react-to-print";
import { GET_BUDGET_NUM, GET_BUDGETS } from "../gql/budget";
import {
  BudgetContextValue,
  BudgetItem,
  BudgetDataParam,
} from "../components/Budget/interfaces";

export const BudgetContext = createContext<BudgetContextValue | undefined>(
  undefined
);

export function useBudgetContext(): BudgetContextValue {
  const ctx = useContext(BudgetContext);
  if (!ctx) {
    throw new Error("useBudgetContext must be used within BudgetContextProvider");
  }
  return ctx;
}

interface BudgetContextProviderProps {
  children: React.ReactNode;
}

const MyContextProvider = ({ children }: BudgetContextProviderProps): React.ReactElement => {
  const [branch, setBranch] = useState(0);
  const [sequence, setSequence] = useState(0);
  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [brand, setBrand] = useState("");
  const [plate, setPlate] = useState("");
  const [printed, setPrinted] = useState(false);
  const [stored, setStored] = useState(false);

  const [disable, setDisable] = useState(true);
  const [issueDateSelected, setIssueDateSelected] = useState<Date | null>(null);
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [inputQuantity, setInputQuantity] = useState(1);
  const [inputDesc, setInputDesc] = useState("");
  const [inputPrice, setInputPrice] = useState(0);

  const descRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const pdfRef = React.createRef<HTMLDivElement>();
  const componentRef = useRef<HTMLDivElement>(null);

  const { data, loading, refetch: refetchBudget } = useQuery(GET_BUDGET_NUM);
  const {
    data: budgetList,
    loading: loadingBudgets,
    refetch: refetchBudgets,
  } = useQuery(GET_BUDGETS);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrintSafe = handlePrint ?? (() => {});

  const updateBudgetNumbers = useCallback(async (): Promise<void> => {
    await refetchBudget();
  }, [refetchBudget]);

  useEffect(() => {
    if (!loading && data) {
      const { getBudgetnums } = data as { getBudgetnums?: { branch?: number; sequence?: number } };
      setBranch(getBudgetnums?.branch ?? 0);
      setSequence(getBudgetnums?.sequence ?? 0);
    }
  }, [data, loading]);

  const getFinalBudget = useCallback(async () => {
    return {
      client,
      address,
      city,
      vehicle,
      brand,
      plate,
      issueDate: issueDateSelected,
      items,
    };
  }, [
    client,
    address,
    city,
    vehicle,
    brand,
    plate,
    issueDateSelected,
    items,
  ]);

  const getBudgetData = useCallback((param: BudgetDataParam): string => {
    switch (param) {
      case "client":
        return client;
      case "address":
        return address;
      case "city":
        return city;
      case "vehicle":
        return vehicle;
      case "brand":
        return brand;
      case "plate":
        return plate;
      default:
        return "";
    }
  }, [client, address, city, vehicle, brand, plate]);

  const cleanFields = useCallback((): void => {
    setClient("");
    setAddress("");
    setCity("");
    setVehicle("");
    setBrand("");
    setPlate("");
    setInputPrice(0);
    setInputDesc("");
    setIssueDateSelected(null);
    setItems([]);
    setTotalAmount(0);
    setStored(false);
  }, []);

  const validateCompletionFields = useCallback((): boolean => {
    return (
      client !== "" &&
      address !== "" &&
      city !== "" &&
      vehicle !== "" &&
      brand !== "" &&
      plate !== "" &&
      issueDateSelected !== null &&
      size(items) > 0
    );
  }, [client, address, city, vehicle, brand, plate, issueDateSelected, items]);

  const value: BudgetContextValue = {
    budgetList,
    loadingBudgets,
    refetchBudgets,
    printed,
    setPrinted,
    branch,
    setBranch,
    sequence,
    setSequence,
    stored,
    setStored,
    client,
    setClient,
    address,
    setAddress,
    city,
    setCity,
    vehicle,
    setVehicle,
    brand,
    setBrand,
    plate,
    setPlate,
    disable,
    setDisable,
    issueDateSelected,
    setIssueDateSelected,
    items,
    setItems,
    totalAmount,
    setTotalAmount,
    inputQuantity,
    setInputQuantity,
    inputDesc,
    setInputDesc,
    inputPrice,
    setInputPrice,
    descRef,
    priceRef,
    pdfRef,
    componentRef,
    cleanFields,
    validateCompletionFields,
    handlePrint: handlePrintSafe,
    getBudgetData,
    getFinalBudget,
    updateBudgetNumbers,
    refetchBudget,
  };

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};

export default MyContextProvider;
