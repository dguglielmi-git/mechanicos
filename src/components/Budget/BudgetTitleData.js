import React, {useEffect, useContext } from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import { BudgetContext } from "../../context/BudgetContext";
import Calendar from "../Common/Calendar";

export default function BudgetTitleData(props) {
    const {
        getTmpbudget,
        persistTempBudget,
    } = props;

    const {
        items,
        disable,
        issueDateSelected,
        setIssueDateSelected,
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
    } = useContext(BudgetContext);


    useEffect(() => {
        if (getTmpbudget.length > 0) {
            setClient(getTmpbudget[0].client);
            setAddress(getTmpbudget[0].address);
            setCity(getTmpbudget[0].city);
            setVehicle(getTmpbudget[0].vehicle);
            setBrand(getTmpbudget[0].brand);
            setPlate(getTmpbudget[0].plate);
        }
    }, []);

    const onSave = () => {
        let tempBudget = {
            "client": client,
            "address": address,
            "city": city,
            "vehicle": vehicle,
            "brand": brand,
            "plate": plate,
            "items": items
        };
        persistTempBudget(tempBudget);
    }

    return (
        <>
            <div className="title-data">
                <h4>Datos del Cliente</h4>
                <div className="title-data__buttons">
                    <Button disabled={disable} color="blue" onClick={() => onSave()}>
                        <Icon name="save" />Guardar Borrador
                    </Button>
                </div>
            </div>
            <div className="budget__client-data">
                <Input
                    disabled={disable}
                    className="data-client"
                    focus
                    placeholder="Señor(es)"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                />
                <Input
                    disabled={disable}
                    className="data-address"
                    focus
                    placeholder="Domicilio"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Input
                    disabled={disable}
                    className="data-city"
                    focus
                    placeholder="Localidad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Input
                    disabled={disable}
                    className="data-vehicle"
                    focus
                    placeholder="Vehiculo"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                />
                <Input
                    disabled={disable}
                    className="data-brand"
                    focus
                    placeholder="Marca"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <Input
                    disabled={disable}
                    className="data-plate"
                    focus
                    placeholder="Patente"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                />
                <div className="data-calendar">
                    <Calendar
                        label="Fecha Emisión"
                        dateSelected={issueDateSelected}
                        setDateSelected={setIssueDateSelected}
                        disabled={disable}
                    />
                </div>
            </div>
        </>
    )
}