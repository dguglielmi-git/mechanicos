import React, { useContext } from "react";
import { confirmDialog } from 'primereact/confirmdialog';
import { Button, Icon, Grid } from "semantic-ui-react";
import { BudgetContext } from "../../context/BudgetContext";
import { toast } from 'react-toastify';

export default function BudgetHeader(props) {
    const { cancelBudget } = props;
    const { disable, setDisable, cleanFields } = useContext(BudgetContext);

    const toggleBudget = () => {
        if (!disable) {
            cancelForm();
        } else {
            setDisable(!disable);
        }
    }

    const accept = (param) => {
        if (param) {
            cancelBudget();
            setDisable(!disable);            
        } else {
            cleanFields();
            toast.success('Se ha reiniciado el formulario.');
        }
    }

    const reject = () => {
        toast.info('Operacion Cancelada');
    }

    const resetForm = () => {
        confirmDialog({
            message: 'Esta seguro de eliminar todos los valores del formulario?',
            header: 'Confirmar Reinicio del Formulario',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    const cancelForm = () => {
        confirmDialog({
            message: 'Si cancela el formulario se perderan todos los datos cargados. Seguro quiere avanzar?',
            header: 'Cancelar Presupuesto',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => accept(true),
            reject
        });
    }


    return (
        <>
            <Grid.Row>
                <Grid.Column computer={16}>
                    <div className="budget-title">
                        <h4>Presupuesto</h4>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column computer={16}>
                    <div className="budget__head">
                        <Button
                            color={disable ? 'green' : 'red'}
                            onClick={() => toggleBudget()}>
                            <Icon name={disable ? 'plus' : 'cancel'} />
                            {disable ? 'Nuevo Presupuesto' : 'Cancelar'}
                        </Button>
                        <Button disabled={disable} color="blue" onClick={() => resetForm()}>
                            <Icon name="file outline" />Reiniciar Formulario
                        </Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </>
    )
}