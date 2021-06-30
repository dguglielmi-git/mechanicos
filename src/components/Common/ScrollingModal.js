import React, { useContext, useState } from "react";
import Pdf from "react-to-pdf";
import { v4 as uuidv4 } from "uuid";
import { Button, Icon, Modal } from "semantic-ui-react";
import { BudgetContext } from "../../context/BudgetContext";
import { toast } from "react-toastify";

const ScrollingModal = (props) => {
  const {
    open,
    setOpen,
    title,
    content,
    btnCaption,
    persistBudget,
    cancelBudget,
  } = props;
  const { pdfRef, handlePrint, printed, setPrinted, setDisable, updateBudgetNumbers, refetchBudget } =
    useContext(BudgetContext);
  const [loading, setLoading] = useState(false);

  const onSaveBudget = async () => {
    setLoading(true);
    try {
      if (!printed) {
        await persistBudget();
        setPrinted(true);
        handlePrint();
      } else {
        handlePrint();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onCancel = async () => {
    if (printed) {
      refetchBudget();
      cancelBudget();
      setDisable(true);
      setPrinted(false);
    }
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      style={{ marginTop: "60px" }}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>{content}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => onCancel()} negative>
          <Icon name="cancel" /> Cerrar
        </Button>
        <Pdf targetRef={pdfRef} filename={`${uuidv4()}.pdf`}>
          {({ toPdf }) => (
            <Button onClick={() => onSaveBudget()} primary loading={loading}>
              <Icon name="print" />
              {btnCaption ? btnCaption : "Imprimir"}
            </Button>
          )}
        </Pdf>
      </Modal.Actions>
    </Modal>
  );
};

export default ScrollingModal;
