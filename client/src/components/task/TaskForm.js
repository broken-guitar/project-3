import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import "./style.css";

export default function TaskForm(props) {

    const [someState, setSomeState] = useState(false);

    useEffect( () => {
        // called every time component updates
    });

    return (
        <div>
            <p>TaskForm here</p>
            <p>user id: {props.userId}</p>
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="title"/>
                    <Form.Text className="text-muted">task title</Form.Text>
                </Form.Group>
            </Form>
        </div>
    )
}