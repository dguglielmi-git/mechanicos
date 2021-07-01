import React, { useContext } from "react";
import Pdf from "react-to-pdf";
import { v4 as uuidv4 } from "uuid";
import { Button, Icon, Modal } from "semantic-ui-react";
import { BudgetContext } from "../../context/BudgetContext";

const ScrollingModal = (props) => {
  const {
    open,
    setOpen,
    title,
    content,
    btnCaption,
    onContinue,
    onCancel,
    loading,
  } = props;
  const { pdfRef } = useContext(BudgetContext);

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
            <Button onClick={() => onContinue()} primary loading={loading}>
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
