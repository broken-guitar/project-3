import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import EditForm from "../editForm/editForm";
import API from "../../utils/API";
import { FiEdit } from "react-icons/fi";

export default function editBtn(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [resource, setResource] = useState({});

  const click = (event) => {
    API.getResourceById(event.target.id)
      .then((res) => {
        let data = res.data;
        console.log(data);
        setResource({
          id: data._id,
          title: data.title,
          link: data.link,
          category: data.category,
          description: data.description,
        });

        console.log(resource);
        handleShow();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button variant="outline-warning" className="mr-2">
        <FiEdit id={props.id} onClick={click}></FiEdit>
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Resource!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* render the editresource form component */}
          <EditForm
            updateState={props.updateState}
            resource={resource}
            handleClose={handleClose}
          ></EditForm>
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
