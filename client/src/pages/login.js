import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../utils/API";

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  // page load?
  componentDidMount() {
    this.setState({
      username: "",
      password: ""
    });
  }
  //   username input change
  handleUserNameChange = e => {
    this.setState({ username: e.target.value });
  };
  //   password input change
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  //   login user function

  userLogin = User => {
    API.userLogin(User).then(res => {
      console.log(res.data);
    });
  };

  //   handle form submit
  handleFormSubmit = e => {
    e.preventDefault();
    let User = {
      username: this.state.username,
      password: this.state.password
    };
    this.userLogin(User);
  };

  //   clearing state values
  clearState = () => {
    this.setState({ username: "", password: "" });
  };

  //   rendering
  render() {
    return (
      <div className="container" style={{ height: "100vh" }}>
        <div className="form-container" style={{ padding: "25%" }}>
          <span className="align-middle">
            <Form id="registerUser">
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  onChange={this.handleUserNameChange}
                  type="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                />
                <p>{this.state.username}</p>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handlePasswordChange}
                  type="password"
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
          </span>
        </div>
      </div>
    );
  }
}
