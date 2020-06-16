import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../utils/API";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      currentUser: "",
    };
  }
  //   <<<<<<<<<<<<<FUNCTIONS>>>>>>>>>>>>>>>>>>>>>>>>>

  //   email input change
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  //   handle form submit
  handleFormSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    this.clearState();
    this.registerUser(newUser);
  };

  //   register user function that will be called in the handle form submit function
  registerUser = (newUser) => {
    API.registerUser(newUser)
      .then((res) => {
        let UserId = res.data;
        //   this is where we redirect to a new endpoint using the new userid, or atleast calling a function passing the new id
        console.log("response from registering new user: ", UserId);
        this.setState({ currentUser: UserId });
        this.props.handleUserLogin({
          user: this.state.currentUser,
          loggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   clearing state values
  clearState = () => {
    this.setState({ email: "", username: "", password: "" });
  };

  //   rendering
  render() {
    return (
      <div className="container" style={{ height: "100vh" }}>
        <div className="form-container" style={{ padding: "25%" }}>
          <span className="align-middle">
            <Form id="registerUser">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
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
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                />
              </Form.Group>

              <Button
                onClick={this.handleFormSubmit}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <Link to="/loginPage/">Already have an account? Log In Here!</Link>
          </span>
        </div>
      </div>
    );
  }
}
