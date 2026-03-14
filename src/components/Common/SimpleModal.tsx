import React from "react";
import { Modal, Button } from "semantic-ui-react";
import { SimpleModalProps } from "./interfaces";

export default function SimpleModal({
  open,
  setOpen,
  title,
  body,
}: SimpleModalProps): React.ReactElement {
  return (
    <Modal
      centered
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{body}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
}
