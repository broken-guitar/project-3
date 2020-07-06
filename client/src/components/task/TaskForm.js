import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { API } from "../../utils/taskAPI";
import "./style.css";
import { set } from "mongoose";

export default function TaskForm(props) {

    const [values, setValues] = useState({
        taskTitle: "",
        taskDesc:  ""
    });
    

    // useEffect( () => {
    //     console.log("TaskForm.useEffect->values: ", values);
    //     loadTaskData();
    // }, []);

    const loadTaskData = () => {
        if (typeof props.task === "object" && props.task !== null) {
            setValues({
                taskTitle: props.task.title,
                taskDesc: props.task.description
            });
        }
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    };

    const addTask = (e) => {
        e.preventDefault();
        const { taskTitle, taskDesc } = values;

        // simple validation, check if object exists
        //if(!taskTitle) return

        console.log(taskTitle, taskDesc, values);

        const newTask = { title: taskTitle, description: taskDesc};
        const data = { task: newTask, userId: props.userId};

        API.addTask(data)
          .then(res => {
            console.log("addTask res: ", res);
           })
           .catch(err => {
                console.log(err);
           });
    };

    const editTask = e => {
        // TODO create api call to edit task
    };
   
    const deleteTask = task => {
        console.log("deleteTask -> task: ", task);

        // TODO create api call to delete task
    }
    return (
        <div>
            <Modal
                className="taskbar-modal border-danger"
                show={props.show}
                onHide={props.onHide}
                onEntering={loadTaskData}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{props.isEdit ? "Edit" : "Add"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="border-danger">
                        <Form.Group>
                            <Form.Control type="text" placeholder="title"
                                name="taskTitle"
                                value={values.taskTitle}
                                onChange={handleInputChange}
                            />
                            <Form.Text className="text-muted">enter a name</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="text" placeholder="description"
                            name="taskDesc"
                            value={values.taskDesc}
                            onChange={handleInputChange}
                        />
                            <Form.Text className="text-muted">enter a description</Form.Text>
                        </Form.Group>
                        {props.isEdit ?
                            <div>
                                <Button
                                    variant="secondary"
                                    onClick={editTask}
                                >edit</Button>
                                <Button variant="danger" onClick={() => deleteTask(props.task)}>
                                    delete
                                </Button>
                            </div> :
                            <div>
                                <Button
                                    variant="secondary"
                                    onClick={addTask}
                                >Add</Button>
                            </div>}
                        
            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Alert show={props.showAlert} variant="danger" dismissible="false"
                            header="Oops!"
                            message={props.alertMessage}
                        /> */}
                    </Modal.Footer>
                </Modal>
            
        </div>
    )
}