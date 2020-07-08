import React, { Component } from "react";
import { Card, InputGroup } from "react-bootstrap";
import { BsCheckBox, BsBell, BsFileText } from "react-icons/bs";

export default function TaskItem(props) {

    const taskIconSwitch = type => {
        switch (type) {
            case "Task":
                return <BsCheckBox/>;
            case "Reminder":
                return <BsBell/>;
            case "Note":
                return <BsFileText/>;
            default:
                return <BsCheckBox/>;
        }
    }

    return (
        
        <Card
            className="taskitem-card mt-2"
            border="secondary"
            onDoubleClick={() => props.handleOpeningTask(props.task)}
            data-id={props.task._id}

        >
           
            <div className="taskitem-prepend">
                {taskIconSwitch(props.task.type)}
            </div>
            <Card.Body className="taskitem-body">
                <Card.Title>{props.task.title}</Card.Title>
                <Card.Text>{props.task.description}</Card.Text>
            </Card.Body>
           
        </Card>
       
    )

}