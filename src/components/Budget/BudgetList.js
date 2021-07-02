import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { Icon } from "semantic-ui-react";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { confirmDialog } from 'primereact/confirmdialog';
import { numToDollar } from "../../utils/utils";
import { BudgetContext } from '../../context/BudgetContext';
import "../../views/Budget/Budget.scss";

export default function BudgetList(props) {
    const { items, setItems, totalAmount, disable } = useContext(BudgetContext);

    const deleteRow = (value) => {
        const deleteList = items.filter(val => val.id !== value["id"]);
        setItems(deleteList);
    }

    const accept = (value) => {
        deleteRow(value);
        toast.success('Registro Eliminado correctamente.');
    }

    const cancel = () => {
        toast.info('Operacion Cancelada');
    }

    const deleteSelected = (value) => {
        confirmDialog({
            message: 'Esta seguro de eliminar el registro?',
            header: 'Confirmar Eliminación',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => accept(value),
            cancel
        });
    };

    const bodyMake = (value) => (

        <div className="options">
            <Icon className="btn-options" name="trash" onClick={() => deleteSelected(value)} disabled={disable} />
        </div>

    );

    return (
        <div className="card">
            <DataTable value={items}>
                <Column className="col-quantity" field="quantity" header="Cant."></Column>
                <Column className="col-description" field="description" header="Descripcion"></Column>
                <Column className="col-price" field="price" header="Precio"></Column>
                <Column className="col-subtotal" field="subtotal" header="Importe"></Column>
                <Column body={(props) => bodyMake(props)}></Column>
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
    )
}