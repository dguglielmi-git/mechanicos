import React, { useState, useRef } from "react";
import { Grid, Button, Input, Icon } from "semantic-ui-react";
import { Divider } from 'primereact/divider';
import BudgetList from "./BudgetList";
import Calendar from "../Common/Calendar";
import './Budget.scss';

export default function Budget() {
    const [disable, setDisable] = useState(true);
    const [issueDateSelected, setIssueDateSelected] = useState(null);
    const [expDateSelected, setExpDateSelected] = useState(null);
    const [lineSelected, setLineSelected] = useState(null);
    const [items, setItems] = useState([]);
    const descRef = useRef();
    const priceRef = useRef();

    const [inputQuantity, setInputQuantity] = useState(1);
    const [inputDesc, setInputDesc] = useState('');
    const [inputPrice, setInputPrice] = useState('');

    let itemId = 1000;

    const toggleBudget = () => setDisable(!disable);

    const cleanInputs = () => {
        setInputQuantity(1);
        setInputDesc('');
        setInputPrice('');
    }

    const addItem = () => {
        let _items = items.slice();
        let tmp = {
            "id": itemId,
            "quantity": inputQuantity,
            "description": inputDesc,
            "price": inputPrice,
            "subtotal": (inputQuantity * inputPrice)
        }
        _items.push(tmp);
        setItems(_items);
        itemId++;
        cleanInputs();
        descRef.current.focus(true);
    }

    const handleKeyPress = (e, origin) => {
        if (e.charCode === 13) {
            if (!origin) {
                addItem();
            } else {
                priceRef.current.focus(true);
            }
        }
    }

    return (
        <div className="budget">
            <Grid>
                <Grid.Row>
                    <Grid.Column computer={16}>
                        <div className="budget__head">
                            <Button
                                disabled={disable}
                                color="blue">
                                <Icon name="download" />
                                Descargar PDF
                            </Button>
                            <Button
                                color={disable ? 'green' : 'red'}
                                onClick={() => toggleBudget()}>
                                <Icon name={disable ? 'plus' : 'cancel'} />
                                {disable ? 'Nuevo Presupuesto' : 'Cancelar'}
                            </Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Divider />
                        <div className="title-data">
                            <h4>Datos del Cliente</h4>
                            <div className="title-data__buttons">
                                <Button disabled={disable} color="green">
                                    <Icon name="file outline" />Limpiar Campos
                                </Button>
                                <Button disabled={disable} color="blue">
                                    <Icon name="save" />Guardar
                                </Button>
                            </div>
                        </div>
                        <div className="budget__client-data">

                            <Input disabled={disable} className="data-client" focus placeholder="Señor(es)" />
                            <Input disabled={disable} className="data-address" focus placeholder="Domicilio" />
                            <Input disabled={disable} className="data-city" focus placeholder="Localidad" />
                            <Input disabled={disable} className="data-vehicle" focus placeholder="Vehiculo" />
                            <Input disabled={disable} className="data-brand" focus placeholder="Marca" />
                            <Input disabled={disable} className="data-plate" focus placeholder="Patente" />
                            <div className="data-calendar">
                                <Calendar
                                    label="Fecha Emisión"
                                    dateSelected={issueDateSelected}
                                    setDateSelected={setIssueDateSelected}
                                    disabled={disable}
                                />
                                <Calendar
                                    label="Fecha Expiración"
                                    dateSelected={expDateSelected}
                                    setDateSelected={setExpDateSelected}
                                    disabled={disable}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="budget__add">
                            <h4>Agregar Items</h4>
                            <div className="budget__add-fields">
                                <Input
                                    disabled={disable}
                                    focus
                                    placeholder="Cantidad"
                                    value={inputQuantity}
                                    onChange={(e) => setInputQuantity(e.target.value)}
                                />
                                <Input
                                    disabled={disable}
                                    focus
                                    placeholder="Descripción"
                                    value={inputDesc}
                                    onChange={(e) => setInputDesc(e.target.value)}
                                    ref={descRef}
                                    onKeyPress={(e) => handleKeyPress(e, 'desc')}
                                />
                                <Input
                                    disabled={disable}
                                    focus
                                    placeholder="Precio Unitario"
                                    value={inputPrice}
                                    onChange={(e) => setInputPrice(e.target.value)}
                                    ref={priceRef}
                                    onKeyPress={(e) => handleKeyPress(e)}
                                />
                                <Button disabled={disable} circular color="blue" onClick={() => addItem()}>
                                    Agregar
                                </Button>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="budget__list">
                    <BudgetList
                        lineSelected={lineSelected}
                        setLineSelected={setLineSelected}
                        items={items}
                        setItems={setItems}
                    />
                </Grid.Row>
            </Grid>
        </div>
    )
}