import React from "react";
import { Modal, Button } from "semantic-ui-react";

export default function SimpleModal(props) {
    const { open, setOpen, title, body} = props;
    return (
        <Modal
            centered={true}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {body}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)}>OK</Button>
            </Modal.Actions>
        </Modal>

    );
}