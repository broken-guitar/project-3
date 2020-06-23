import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import API from "../utils/API";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regUsername: "",
      regEmail: "",
      regPassword: "",
      logUsername: "",
      logPassword: "",
      Show: false,
      setShow: false
    };
  }
  // FUNCTIONS

  //    input change
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  //   handle login form submit
  handleLoginSubmit = e => {
    e.preventDefault();
    let User = {
      username: this.state.logUsername,
      password: this.state.logPassword
    };
    this.userLogin(User);
  };

  //   login user function

  userLogin = User => {
    API.userLogin(User)
      .then(res => {
        // console.log(res);
        let parsedId = { id: this.props.getCookie() };
        // console.log("js-cookie: ", parsedId);
        console.log(res.data.message);
        API.checkUser(parsedId).then(response => {
          // console.log("loggedIn? ", response.data.loggedin);
          let boolean = response.data.loggedin;
          this.props.handleUserLogin(boolean);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //   register user function that will be called in the handle form submit function
  registerUser = newUser => {
    API.regUser(newUser)
      .then(res => {
        console.log(res.data);
        let parsedId = { id: this.props.getCookie() };
        //   this is where we redirect to a new endpoint using the new userid, or atleast calling a function passing the new id
        // console.log("response from registering new user: ", parsedId);
        API.checkUser(parsedId).then(response => {
          // console.log("loggedIn? ", response.data.loggedin);
          let boolean = response.data.loggedin;
          this.props.handleUserLogin(boolean);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //   handle reg form submit
  handleRegSubmit = e => {
    e.preventDefault();
    let User = {
      username: this.state.regUsername,
      email: this.state.regEmail,
      password: this.state.regPassword
    };
    this.registerUser(User);
  };

  //  modal functions register

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => this.setState({ setShow: true });

  handleLogClose = () => this.setState({ Show: false });
  handleLogShow = () => this.setState({ Show: true });

  // render
  render() {
    return (
      <>
        {/* register button */}
        <Button variant="primary" onClick={this.handleShow}>
          Register
        </Button>
        {/* register modal */}
        <Modal show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* register form */}
            <Form id="registerUser">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="email"
                  name="regEmail"
                  placeholder="Enter email"
                  value={this.state.regEmail}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="username"
                  name="regUsername"
                  placeholder="Enter Username"
                  value={this.state.regUsername}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="password"
                  name="regPassword"
                  placeholder="Password"
                  value={this.state.regPassword}
                />
              </Form.Group>

              <Button
                onClick={this.handleRegSubmit}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* login */}
        {/* log button */}
        <Button variant="primary" onClick={this.handleLogShow}>
          Login
        </Button>
        {/* log modal */}
        <Modal show={this.state.Show} onHide={this.handleLogClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* login form */}
            <Form id="loginUser">
              <Form.Group controlId="formloginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="username"
                  name="logUsername"
                  placeholder="Enter Username"
                  value={this.state.logUsername}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="password"
                  name="logPassword"
                  placeholder="Password"
                  value={this.state.logPassword}
                />
              </Form.Group>

              <Button
                onClick={this.handleLoginSubmit}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleLogClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
