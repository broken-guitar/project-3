import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal, Form, Button } from "react-bootstrap";
import { BsPlusSquare, BsPencilSquare, BsTrash, BsCheck } from "react-icons/bs";
import { API } from "../../utils/taskAPI";
import "./style.css";
import { set } from "mongoose";

export default function TaskForm(props) {

    const [values, setValues] = useState({
        taskTitle: "",
        taskDesc:  "",
        taskType:   "",
        taskTypes: ["Task"]
    });
    const [isInputDisabled, setIsInputDisabled] = useState(true);

    // useEffect( () => {
    //     console.log("TaskForm.useEffect->values: ", values);
    //     loadTaskData();
    // }, []);
    
    const loadTaskFormData = () => {
        // load or clear form input values depending on add/edit form state
        if (typeof props.task === "object" && props.task !== null && props.isEdit) {
            setValues({
                taskTitle:  props.task.title,
                taskDesc:   props.task.description,
                taskType:   props.task.type,
                taskTypes:  props.taskTypes
            });
            setIsInputDisabled(true);
        } else {
            setValues({
                taskTitle:  "",
                taskDesc:   "",
                taskType:   "",
                taskTypes:  props.taskTypes
            });
            setIsInputDisabled(false);
        }
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    };

    const addTask = () => {
        // e.preventDefault();
        const { taskTitle, taskDesc, taskType } = values; // don't need to destructure here?
        const newTask = {
            title:          taskTitle,
            description:    taskDesc,
            type:           taskType        
        };
        const data = { task: newTask, userId: props.userId};

        API.addTask(data)
          .then(res => {
            console.log("addTask res: ", res);
            props.getUsersTasks(props.userId);
            props.onHide();

           })
           .catch(err => {
                console.log(err);
           });
    };

    const editTask = e => {
        // OPTION: possible to move this into Edit button onClick instead? 
        setIsInputDisabled(false);
    };

    const saveTask = taskId => {
       
        const taskData = {
            title:          values.taskTitle,
            description:    values.taskDesc,
            type:           values.taskType
        }
        console.log("taskData: ", taskData);
        API.updateTask(taskId, taskData)
            .then(res => {
                console.log("API.updateTask -> res=", res);
                setIsInputDisabled(true);
                props.getUsersTasks(props.userId);
                props.onHide();
            })
            .catch(err => {
                console.log(err);
            });
    }
   
    const deleteTask = taskId => {
        console.log("deleteTask -> task: ", taskId);
        API.deleteTask(taskId)
            .then(res => {
                // console.log("API.deleteTask -> res=", res);
                props.getUsersTasks(props.userId);
                props.onHide();
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div>
            <Modal 
                className="taskform-modal"
                show={props.show}
                onHide={props.onHide}
                onEntering={loadTaskFormData}
                >
                <div className="tf-modal-content-container">
                    <Modal.Header closeButton>
                        <Modal.Title>{props.isEdit ? "Edit" : "Add"} Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="border-danger" variant="danger">
                            <Form.Group as={Row}>
                                <Form.Label column sm={3} className="text">Title</Form.Label>
                                <Col sm={9}>
                                <Form.Control type="text" placeholder="title"
                                    name="taskTitle"
                                    value={values.taskTitle}
                                    onChange={handleInputChange}
                                    disabled={isInputDisabled ? "disabled" : ""}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3} className="text">Type</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="select"
                                        name="taskType"
                                        value={values.taskType}
                                        onChange={handleInputChange}
                                        disabled={isInputDisabled ? "disabled" : ""}
                                        >
                                        {values.taskTypes.map((taskType, index) => (
                                            <option key={index}>{taskType}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3} className="text">Description</Form.Label>
                                <Col sm={9}>
                                    <Form.Control as="textarea" rows="3" placeholder="description"
                                        name="taskDesc"
                                        value={values.taskDesc}
                                        onChange={handleInputChange}
                                        disabled={isInputDisabled ? "disabled" : ""}
                                        />
                                </Col>
                            </Form.Group>
                            <div className="taskform-btn-container">
                                {props.isEdit ?
                                    <div>
                                        {isInputDisabled ?
                                            
                                            <Button
                                                variant="secondary" className="task-edit fbtn"
                                                size="lg"
                                                onClick={() => editTask()}
                                                >
                                                <BsPencilSquare className="tf-icon"/>
                                            </Button>
                                            :
                                            <Button
                                                variant="success" className="task-save fbtn"
                                                size="lg"
                                                onClick={() => saveTask(props.task._id)}
                                                >
                                                <BsCheck className="tf-icon"/>
                                            </Button>
                                        }
                                        
                                        <Button className="task-delete fbtn"variant="danger"
                                            onClick={() => deleteTask(props.task._id)}
                                            size="lg"
                                            >
                                            <BsTrash className="tf-icon"/>
                                        </Button>

                                    </div>
                                    :
                                    <div>
                                        <Button
                                            className="task-add-fbtn" size="lg"
                                            variant="success"
                                            onClick={() => addTask()}
                                            ><BsPlusSquare className="tf-icon"/>
                                        </Button>
                                    </div>
                                }
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Alert show={props.showAlert} variant="danger" dismissible="false"
                            header="Oops!"
                            message={props.alertMessage}
                        /> */}
                    </Modal.Footer>
                </div>
                </Modal>
            
        </div>
    )
}