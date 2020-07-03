import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
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
        const { taskTitle, taskDescription } = values;

        // simple validation, check if object exists
        //if(!taskTitle) return

        console.log(taskTitle);
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
                       name="description"
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