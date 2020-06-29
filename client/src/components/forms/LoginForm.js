import React from "react";
import { Form, Button } from "react-bootstrap";


// import Image from "react-bootstrap/Image";
// import "./style.css";

export default function LoginForm(props) {

    return (
        <div>
        {/* login form */}
        
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

                <Button
                    onClick={props.handleLoginSubmit}
                    variant="primary"
                    type="submit"
                >
                Submit
                </Button>
            </Form>
        
            </div>
    )
    
}

