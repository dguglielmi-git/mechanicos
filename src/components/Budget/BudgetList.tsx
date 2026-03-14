import React from "react";
import { toast } from "react-toastify";
import { Icon } from "semantic-ui-react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { confirmDialog } from "primereact/confirmdialog";
import { numToDollar } from "../../utils/utils";
import { useBudgetContext } from "../../context/BudgetContext";
import { BudgetItem } from "./interfaces";
import "../../views/Budget/Budget.scss";

export default function BudgetList(): React.ReactElement {
  const { items, setItems, totalAmount, disable } = useBudgetContext();

  const deleteRow = (value: BudgetItem): void => {
    const deleteList = items.filter((val) => val.id !== value.id);
    setItems(deleteList);
  };

  const accept = (value: BudgetItem): void => {
    deleteRow(value);
    toast.success("Registro Eliminado correctamente.");
  };

  const reject = (): void => {
    toast.info("Operacion Cancelada");
  };

  const deleteSelected = (value: BudgetItem): void => {
    confirmDialog({
      message: "Esta seguro de eliminar el registro?",
      header: "Confirmar Eliminación",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(value),
      reject,
    });
  };

  const bodyMake = (rowData: BudgetItem) => (
    <div className="options">
      <Icon
        className="btn-options"
        name="trash"
        onClick={() => deleteSelected(rowData)}
        disabled={disable}
      />
    </div>
  );

  return (
    <div className="card">
      <DataTable value={items}>
        <Column className="col-quantity" field="quantity" header="Cant." />
        <Column className="col-description" field="description" header="Descripcion" />
        <Column className="col-price" field="price" header="Precio" />
        <Column className="col-subtotal" field="subtotal" header="Importe" />
        <Column body={(props) => bodyMake(props)} />
      </DataTable>
      <div className="total-amount">
        <div>
          <h3>Total:</h3>
        </div>
        <div className="total-amount__figure">
          <h3>{numToDollar(totalAmount)}</h3>
        </div>
      </div>
    </div>
  );
}
