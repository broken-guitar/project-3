import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddResourceForm from "../addResource/addResource";
import { FiPlus } from "react-icons/fi";
import "./style.css";

export default function addNewBtn(props) {
  // useState is a "hook" that allows us to use state in a regular component
  const [show, setShow] = useState(false); // [ show = false, setShow = function that updates "show" ]

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="outline-info" className="mr-3" onClick={handleShow}>
        Add New Resource
        <div className="add-new">
          <FiPlus />
        </div>
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Resource!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* render the add resource form component */}
          <AddResourceForm
            updateState={props.updateState}
            handleClose={handleClose}
          ></AddResourceForm>
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
