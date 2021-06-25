import React, { useState, useEffect } from 'react';
import { Icon } from "semantic-ui-react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./Budget.scss";

export default function BudgetList(props) {
    const { lineSelected, setLineSelected, items, setItems } = props;
   
    const deleteRow = (value) => {

        // in production
        // we can get the _id as: value["_id"];
       

        // console.log(Object.entries(value));
        // console.log(value["id"]);
        // value["id"] = value["id"] - 1;
        // console.log(value["id"]._id);

    }

    const editRow = (value) => {
        setLineSelected(value);
        // let _id = value["id"];
        // let _quantity = value["quantity"];
        // let _description = value["description"];
        // let _price = value["price"];
        // let _subtotal = value["subtotal"];

        // console.log('edit ' + value);
        // products.map(el => {
        //     console.log(el["id"]);
        // })
    }

    const bodyMake = (value) => (
        <>
            <div className="options">
                <Icon className="btn-options" name="edit"  onClick={() => editRow(value)} />
                <Icon className="btn-options" name="trash" onClick={() => deleteRow(value)} />
            </div>
        </>
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
        </div>
    )
}