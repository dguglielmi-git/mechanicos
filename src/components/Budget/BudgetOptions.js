import React, { useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import { BudgetContext } from "../../context/BudgetContext";

export default function BudgetOptions(props) {
  const { disable, setOpenValidModal, setOpenScrollModal } = props;
  const { validateCompletionFields } =
    useContext(BudgetContext);

  const handleDownloadPDF = async () => {
    if (validateCompletionFields()) {
      setOpenScrollModal(true);
    } else {
      setOpenValidModal(true);
    }
  };

  return (
    <div className="budget__final-options">
      <div>
        <Button
          disabled={disable}
          color="green"
          onClick={() => handleDownloadPDF()}
        >
          <Icon name="download" />
          Descargar PDF
        </Button>
      </div>
    </div>
  );
}
