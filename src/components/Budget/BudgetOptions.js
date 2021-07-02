import React, { useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import { BudgetContext } from "../../context/BudgetContext";

export default function BudgetOptions(props) {
  const { setOpenScrollModal, persistBudget } = props;
  const { stored } = useContext(BudgetContext);

  return (
    <div className="budget__final-options">
      <div>
        <Button disabled={stored} color="blue" onClick={() => persistBudget()}>
          <Icon name="checkmark" />
          Finalizar Presupuesto
        </Button>
        <Button
          disabled={!stored}
          color="green"
          onClick={() => setOpenScrollModal(true)}
        >
          <Icon name="download" />
          Descargar PDF
        </Button>
      </div>
    </div>
  );
}
