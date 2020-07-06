import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default function TaskItem(props) {

    return (
        <Card
            className="taskitem-card m-1"
            border="light"
            onDoubleClick={() => props.handleOpeningTask(props.task)}
            data-id={props.task._id}

        >
            <Card.Body className="taskitem-body">
                <Card.Title>{props.task.title}</Card.Title>
                <Card.Text>{props.task.description}</Card.Text>
            </Card.Body>
        </Card>
    )

}