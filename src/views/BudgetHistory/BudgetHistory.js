import React, { useState, useEffect, useContext } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useQuery } from "@apollo/client";
import { GET_BUDGETS } from "../../gql/budget";
import { formatDate } from "../../utils/utils";
import ScrollingModal from "../../components/Common/ScrollingModal";
import BudgetPreview from "../../components/Budget/BudgetPreview";
import { BudgetContext } from "../../context/BudgetContext";
import "./BudgetHistory.scss";

export default function BudgetHistory() {
  const { data: budgetList, loading } = useQuery(GET_BUDGETS);
  const { componentRef, handlePrint } = useContext(BudgetContext);

  const [customers, setCustomers] = useState(null);
  const [selectedCustomer3, setSelectedCustomer3] = useState(null);
  const [globalFilter1, setGlobalFilter1] = useState(null);
  const [globalFilter2, setGlobalFilter2] = useState(null);
  const [globalFilter3, setGlobalFilter3] = useState(null);
  const [openScrollModal, setOpenScrollModal] = useState(false);

  const [budgetSelected, setBudgetSelected] = useState(null);

  useEffect(() => {
    if (!loading) {
      let budgets = [];
      //Formatting Date
      budgetList.getBudget.map((e) => {
        let tmp = {
          ...e,
          issueDate: formatDate(new Date(e.issueDate * 1)),
        };
        budgets.push(tmp);
      });
      setCustomers(budgets);
    }
  }, [budgetList, loading]);

  const dataTableFuncMap = {
    globalFilter1: setGlobalFilter1,
    globalFilter2: setGlobalFilter2,
    globalFilter3: setGlobalFilter3,
  };

  const renderHeader = (globalFilterKey) => {
    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) =>
            dataTableFuncMap[`${globalFilterKey}`](e.target.value)
          }
          placeholder="Búsqueda Global"
        />
      </span>
    );
  };

  const onCustomSaveState = (state) => {
    window.sessionStorage.setItem(
      "dt-state-demo-custom",
      JSON.stringify(state)
    );
  };

  const onCustomRestoreState = () => {
    return JSON.parse(window.sessionStorage.getItem("dt-state-demo-custom"));
  };

  ///
  /// FUNCTIONS TO BUILD
  ///

  const handleRowClick = (el) => {
    console.log(el);
    console.log(el.branch);
    console.log(el.issueDate.substr(6, 4));

    setBudgetSelected(el);

    // calculate totalAmount

    // Open Dialog
    setOpenScrollModal(true);
  };

  const getDay = (_date) => budgetSelected?.issueDate.substr(0, 2);

  const getMonth = (_date) => budgetSelected?.issueDate.substr(3, 2);

  const getYear = (_date) => budgetSelected?.issueDate.substr(6, 4);

  const onContinue = () => {
    
    handlePrint();
  };

  const onCancel = () => setOpenScrollModal(false);

  const getBudgetData = (_param) => {
    switch (_param) {
      case "client":
        return budgetSelected?.client;
      case "address":
        return budgetSelected?.address;
      case "city":
        return budgetSelected?.city;
      case "vehicle":
        return budgetSelected?.vehicle;
      case "brand":
        return budgetSelected?.brand;
      case "plate":
        return budgetSelected?.plate;
      default:
        return "";
    }
  };

  const header3 = renderHeader("globalFilter3");

  if (loading) return null;
  return (
    <div className="budget-history">
      <div className="card">
        <h5>Custom Storage</h5>
        <DataTable
          value={customers}
          paginator
          rows={10}
          header={header3}
          globalFilter={globalFilter3}
          selection={selectedCustomer3}
          onSelectionChange={(e) => setSelectedCustomer3(e.value)}
          selectionMode="single"
          dataKey="id"
          stateStorage="custom"
          customSaveState={onCustomSaveState}
          customRestoreState={onCustomRestoreState}
          emptyMessage="No customers found."
          onRowClick={(e) => handleRowClick(e.data)}
        >
          <Column
            field="issueDate"
            header="Fecha"
            sortable
            filter
            filterPlaceholder="Fecha"
          ></Column>
          <Column
            field="sequence"
            header="# Presupuesto"
            sortable
            filter
            filterPlaceholder="Presupuesto"
          ></Column>
          <Column
            field="client"
            header="Cliente"
            sortable
            filter
            filterPlaceholder="Cliente"
          ></Column>
          <Column
            field="plate"
            header="Patente"
            sortable
            filter
            filterPlaceholder="Patente"
          ></Column>
        </DataTable>
      </div>
      <ScrollingModal
        open={openScrollModal}
        setOpen={setOpenScrollModal}
        title="Vista Preliminar Presupuesto"
        content={
          <BudgetPreview
            branch={budgetSelected?.branch}
            componentRef={componentRef}
            getBudgetData={getBudgetData}
            items={budgetSelected?.items}
            sequence={budgetSelected?.sequence}
            totalAmount={budgetSelected?.totalAmount}
            day={getDay()}
            month={getMonth()}
            year={getYear()}
          />
        }
        onContinue={onContinue}
        onCancel={onCancel}
        loading={false}
      />
    </div>
  );
}
