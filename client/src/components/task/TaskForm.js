import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API } from "../../utils/taskAPI";
import "./style.css";

export default function TaskForm(props) {

       const [values, setValues] = useState({taskTitle: "", taskDesc: ""});

    // useEffect( () => {
    //     console.log("TaskForm.useEffect->props.userId: ", props.userId);
    // });

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

        API.addTask(data)
          .then(res => {
            console.log("addTask res: ", res);
           })
           .catch(err => {
                console.log(err);
           });
    }
   
    return (
        <div>
            <p>Current user id: {props.userId}</p>
            <Form>
                
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

                <Button
                    variant="secondary"
                    onClick={addTask}
                >Add</Button>
            
            </Form>
        </div>
    )
}