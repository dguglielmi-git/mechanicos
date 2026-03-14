import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useBudgetContext } from "../../context/BudgetContext";

interface BudgetOptionsProps {
  setOpenScrollModal: (open: boolean) => void;
  persistBudget: () => Promise<boolean | void>;
}

export default function BudgetOptions({
  setOpenScrollModal,
  persistBudget,
}: BudgetOptionsProps): React.ReactElement {
  const { stored } = useBudgetContext();

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
