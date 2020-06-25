import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddResourceForm from "../addResource/addResource";

export default function addNewBtn(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="outline-info" className="mr-3" onClick={handleShow}>
        Add New Resource!
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Resource!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddResourceForm handleClose={handleClose}></AddResourceForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
