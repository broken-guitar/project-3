import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { BsPlusSquare, BsPencilSquare, BsXSquare, BsCheck } from "react-icons/bs";
import { API } from "../../utils/taskAPI";
import "./style.css";
import { set } from "mongoose";

export default function TaskForm(props) {

    const [values, setValues] = useState({
        taskTitle: "",
        taskDesc:  ""
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
                taskTitle: props.task.title,
                taskDesc: props.task.description
            });
            setIsInputDisabled(true);
        } else {
            setValues({
                taskTitle:  "",
                taskDesc:   ""
            });
            setIsInputDisabled(false);
        }
        console.log("currentTask.props.task: ", props.task);
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    };

    const addTask = () => {
        // e.preventDefault();
        const { taskTitle, taskDesc } = values; // don't need to destructure here?
        const newTask = { title: taskTitle, description: taskDesc};
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
            title: values.taskTitle,
            description: values.taskDesc
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
                className="taskbar-modal border-danger"
                show={props.show}
                onHide={props.onHide}
                onEntering={loadTaskFormData}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{props.isEdit ? "Edit" : "Add"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>task id: {props.task._id}</p>
                        <Form className="border-danger">
                        <Form.Group>
                            <Form.Control type="text" placeholder="title"
                                name="taskTitle"
                                value={values.taskTitle}
                                onChange={handleInputChange}
                                disabled={isInputDisabled ? "disabled" : ""}
                            />
                            <Form.Text className="text-muted">task name</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="text" placeholder="description"
                            name="taskDesc"
                            value={values.taskDesc}
                            onChange={handleInputChange}
                            disabled={isInputDisabled ? "disabled" : ""}
                        />
                            <Form.Text className="text-muted">description</Form.Text>
                        </Form.Group>
                        {props.isEdit ?
                            <div>
                                {isInputDisabled ?
                                    <Button
                                        variant="secondary" className=""
                                        onClick={() => editTask()}
                                    >
                                        <BsPencilSquare/>
                                    </Button> :
                                    <Button
                                        variant="success" className=""
                                         onClick={() => saveTask(props.task._id)}
                                    >
                                       <BsCheck/>
                                    </Button>
                                }
                                

                                <Button className="mx-2"variant="danger" onClick={() => deleteTask(props.task._id)}>
                                    <BsXSquare/>
                                </Button>

                            </div> :
                            <div>
                                <Button
                                    variant="success"
                                    onClick={() => addTask()}
                                > <BsPlusSquare/></Button>
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