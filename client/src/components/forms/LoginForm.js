import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import Alert from "../alerts/loginAlert";
import "./style.css";


// import Image from "react-bootstrap/Image";
// import "./style.css";

export default function LoginForm(props) {
    
    const [wasOpen, setWasOpen] = useState(false);

    // useEffect runs whenever the function component state updates;
    // using it here to reset the LoginForm when register modal exits
    useEffect(() => {
        // console.log("useEffect -> loginForm updated!", props.showRegister, wasOpen);
        if (props.showRegister) {
            setWasOpen(true);
        }
        if (wasOpen && !props.showRegister) {
            // console.log("should reset login form");
            setWasOpen(false);
            props.resetLoginForm(true);
        }
        
    });

    return (
        <div>
        {/* login form */}
        <Container fluid="lg" className="login-container vh-100">
            <Row className="align-items-center h-100">
            <Col className="col-sm-12 mx-auto">
            <Card style={{width: "300px", margin: "0 auto", float: "none"}}>
                <Card.Header>Login</Card.Header>
                <Card.Body> {/* Card.Body pads the content */}
                <Form id="loginUser">
                    
                    <Form.Group controlId="formloginUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            onChange={props.handleInputChange}
                            type="username"
                            name="logUsername"
                            placeholder="Enter Username"
                            value={props.logUsername}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            onChange={props.handleInputChange}
                            type="password"
                            name="logPassword"
                            placeholder="Password"
                            value={props.logPassword}
                        />
                    </Form.Group>
                    <Col>
                    <Button
                        className="mr-4 login-button"
                        onClick={props.handleLoginSubmit}
                        variant="dark"
                        type="submit"
                    >
                        Login
                    </Button>
                    <Button
                        className="login-button"
                        onClick={props.handleRegShow}
                        variant="dark"
                        type="submit"
                    >
                        Register
                    </Button>
                    </Col>
                
                </Form>
               
                </Card.Body>
                <div className="px-2">
                {!props.showRegister ? <Alert show={props.showAlert} variant="danger" dismissible="false"
                    header="Oops!" message={props.alertMessage} /> : null}
                
                </div>
            </Card>
            </Col>
            </Row>
            </Container>

            {/* register modal */}

             <Modal show={props.showRegister} onHide={props.handleRegClose}>
                <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                {/* register form */}
                <Form id="registerUser">
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={props.handleInputChange}
                        type="email"
                        name="regEmail"
                        placeholder="Enter email"
                        value={props.regEmail}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                            </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        onChange={props.handleInputChange}
                        type="username"
                        name="regUsername"
                        placeholder="Enter Username"
                        value={props.regUsername}
                    />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={props.handleInputChange}
                        type="password"
                        name="regPassword"
                        placeholder="Password"
                        value={props.regPassword}
                    />
                    </Form.Group>

                    <Button
                    onClick={props.handleRegSubmit}
                    variant="primary"
                    type="submit"
                    >
                    Submit
                        </Button>
                </Form>
                </Modal.Body>

                <Modal.Footer>

                <Alert show={props.showAlert} variant="danger" dismissible="false"
                    header="Oops!" message={props.alertMessage} />

                {/* <Button variant="secondary" onClick={props.handleRegClose}>
                    Close
                    </Button> */}

                </Modal.Footer>

                </Modal>
       
        
        </div>
    )
    
}

