import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import taskAPI from "../../utils/taskAPI";
import "./style.css";

export default function TaskForm(props) {

       const [values, setValues] = useState({taskTitle: "", taskDesc: ""});

    useEffect( () => {
        // called every time component updates
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({...values, [name]: value})
    }

    const addTask = (e) => {
        e.preventDefault();
        const { taskTitle, taskDesc } = values;

        // simple validation, check if object exists
        //if(!taskTitle) return

        console.log(taskTitle, taskDesc, values);

        const newTask = { title: taskTitle, description: taskDesc};
        const data = { task: newTask, userId: props.userId};

        taskAPI.addTask(data)
          .then(res => {
            console.log("addTask res: ", res);
           })
           .catch(err => {
                console.log(err);
           });
    }
   
    return (
        <div>
            <p>TaskForm here</p>
            <p>user id: {props.userId}</p>
            <Form>
                
                <Form.Group>
                    <Form.Control type="text" placeholder="title"
                        name="taskTitle"
                        value={values.taskTitle}
                        onChange={handleInputChange}
                    />
                    <Form.Text className="text-muted">title</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="text" placeholder="description"
                       name="taskDesc"
                       value={values.taskDesc}
                       onChange={handleInputChange}
                   />
                    <Form.Text className="text-muted">description</Form.Text>
                </Form.Group>

                <Button
                    variant="secondary"
                    onClick={addTask}
                >Add</Button>
            
            </Form>
        </div>
    )
}