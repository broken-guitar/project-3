import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Form, Button } from "react-bootstrap";
import { BsPlusSquare, BsPlus, BsPencilSquare, BsTrash, BsCheck } from "react-icons/bs";
import { API } from "../../utils/taskAPI";
import "./style.css";

export default function TaskForm(props) {

    const [values, setValues] = useState({
        taskTitle: "",
        taskDesc:  "",
        taskType:   "",
        taskTypes: ["Task"]
    });
    const [isInputDisabled, setIsInputDisabled] = useState(true);
    const [validated, setValidated] = useState(false);
    const taskForm = useRef(null);

    // useEffect( () => {
    //     console.log("TaskForm.useEffect->values: ", values);
    //     loadTaskData();
    // }, []);
    
    const loadTaskFormData = () => {
        // load or clear form input values depending on add/edit form state
        setValidated(false);
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
                taskType:   "Task", // set the default
                taskTypes:  props.taskTypes
            });
            setIsInputDisabled(false);
        }
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    };

    const formIsValid = (e, form) => {
        // const form = e.currentTarget;
        let valid = false;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            valid = false;
        } else {
            valid = true;
        }
        setValidated(true);
       
        return valid;
      };

    const addTask = e => {
        e.preventDefault();
        let valid = formIsValid(e, taskForm.current);
        if(valid) {
            const newTask = {
                title:          values.taskTitle,
                description:    values.taskDesc,
                type:           values.taskType        
            };
            console.log("newTask: ", newTask);
    
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
        } 
        
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
                <div className="tf-modal-content-wrapper">
                    <Modal.Header closeButton>
                        <Modal.Title>{props.isEdit ? "Edit" : "Add"} Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated}className="border-danger" variant="danger"
                            ref={taskForm}
                            data-feedback={{success: "", error: "fa-times"}}
                            >
                            <Form.Group as={Row} controlId="validTitle" >
                                <Form.Label column sm={3} className="text">Title</Form.Label>
                                <Col sm={9}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="title"
                                    name="taskTitle"
                                    value={values.taskTitle}
                                    onChange={handleInputChange}
                                    disabled={isInputDisabled ? "disabled" : ""}
                                    />
                                <Form.Control.Feedback type="invalid">
                                 Please enter a title!
                                </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                         
                            <Form.Group as={Row} className="no-validate">
                                <Form.Label column sm={3} className="text">Type</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="select"
                                        name="taskType"
                                        defaultValue="Task"
                                        value={values.taskType}
                                        onChange={handleInputChange}
                                        disabled={isInputDisabled ? "disabled" : ""}
                                        >
                                        {/* <option className="text-muted" value="" disabled hidden>Select task type...</option> */}
                                        {values.taskTypes.map((taskType, index) => (
                                            <option
                                                key={index}
                                                value={taskType}
                                                >
                                                {taskType}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback>
                                    
                                    </Form.Control.Feedback>
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
                                                variant="outline-secondary"
                                                className="task-edit fbtn"
                                                size="lg"
                                                onClick={() => editTask()}
                                                >
                                                <BsPencilSquare className="tf-icon"/>
                                            </Button>
                                            :
                                            <Button
                                                variant="outline-success"
                                                className="task-save fbtn"
                                                size="lg"
                                                onClick={() => saveTask(props.task._id)}
                                                >
                                                <BsCheck className="tf-icon"/>
                                            </Button>
                                        }
                                        
                                        <Button
                                            className="task-delete fbtn"
                                            variant="outline-danger"
                                            onClick={() => deleteTask(props.task._id)}
                                            size="lg"
                                            >
                                            <BsTrash className="tf-icon"/>
                                        </Button>

                                    </div>
                                    :
                                    <div>
                                        <Button
                                            type="submit"
                                            className="task-add-fbtn"
                                            size="lg"
                                            variant="outline-success"
                                            onClick={(e) => addTask(e)}
                                            ><BsPlus className="tf-icon"/>
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