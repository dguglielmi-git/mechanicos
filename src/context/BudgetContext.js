import React, { createContext, useState, useRef, useEffect } from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { useReactToPrint } from "react-to-print";
import { GET_BUDGET_NUM, GET_BUDGETS } from "../gql/budget";
export const BudgetContext = createContext();

const MyContextProvider = (props) => {
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
  const [issueDateSelected, setIssueDateSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [inputQuantity, setInputQuantity] = useState(1);
  const [inputDesc, setInputDesc] = useState("");
  const [inputPrice, setInputPrice] = useState(0.0);

  const descRef = useRef();
  const priceRef = useRef();
  const pdfRef = React.createRef();
  const componentRef = useRef();

  const { data, loading, refetch: refetchBudget } = useQuery(GET_BUDGET_NUM);
  const {
    data: budgetList,
    loading: loadingBudgets,
    refetch: refetchBudgets,
  } = useQuery(GET_BUDGETS);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const updateBudgetNumbers = async () => {
    await refetchBudget();
  };

  useEffect(() => {
    (async () => {
      if (!loading) {
        const { getBudgetnums } = await data;
        setBranch(getBudgetnums.branch);
        setSequence(getBudgetnums.sequence);
      }
    })();
  }, [data, loading]);

  const getFinalBudget = async () => {
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
  };

  const getBudgetData = (param) => {
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
  };

  const cleanFields = () => {
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
  };

  const validateCompletionFields = () => {
    if (
      client !== "" &&
      address !== "" &&
      city !== "" &&
      vehicle !== "" &&
      brand !== "" &&
      plate !== "" &&
      (issueDateSelected !== null) && (size(items) > 0)
    ) {
      return true;
    }
    return false;
  };

  return (
    <BudgetContext.Provider
      value={{
        // States
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
        address,
        city,
        vehicle,
        brand,
        plate,
        setClient,
        setAddress,
        setCity,
        setVehicle,
        setBrand,
        setPlate,
        disable,
        issueDateSelected,
        items,
        totalAmount,
        setDisable,
        setIssueDateSelected,
        setItems,
        setTotalAmount,
        inputQuantity,
        inputDesc,
        inputPrice,
        setInputQuantity,
        setInputDesc,
        setInputPrice,

        // Refs
        descRef,
        priceRef,
        pdfRef,
        componentRef,

        // Functions
        cleanFields,
        validateCompletionFields,
        handlePrint,
        getBudgetData,
        getFinalBudget,
        updateBudgetNumbers,
        refetchBudget,
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
};
export default MyContextProvider;
