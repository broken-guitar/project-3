import React, { Component } from "react";

import LoginForm from "../components/forms/LoginForm";
//import Alert from "../components/alerts/loginAlert";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import API from "../utils/API";

import "./style.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regUsername: "",  // OPTION: might be able to combine these login/register state vars
      regEmail: "",     // and their modal components to make more reuseable
      regPassword: "",
      logUsername: "",
      logPassword: "",
    //   showLogin: false,
      showRegister: false,
      showAlert: false,
      alertMessage: "",
      errors: {         // OPTION: these nested errors.props are for relaying specific error messages 
        username: "",   // to each input control (we can be remove later if we don't end up using them)
        email: "",
        password: ""
      }
    };
  }


  componentDidMount() {
    console.log("login page mounted");
    this.resetLoginForm(true); // clears input values and alerts
    this.setState({showLogin: true}); // show login form on load

  }
  // updates input controls on login/register forms
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // handles username and password submit, sends to this.userLogin()
  handleLoginSubmit = e => {
    e.preventDefault();
    let User = {
      username: this.state.logUsername,
      password: this.state.logPassword
    };
    this.userLogin(User);
  };

  // sends username/password to server for authentication against db
  userLogin = User => {
    API.userLogin(User)
      .then(res => {
        console.log("loginPage.userLogin-> res: ", res)
        // show validation error Alertp if response returned any errors
        if (res.data.error) {
          this.setState({ showAlert: true, alertMessage: res.data.error });
        } else {
          // check if user is authenticated with the cookie
          let parsedId = { id: this.props.getCookie() };
          API.checkUser(parsedId).then(response => {
            let boolean = response.data.loggedin;
            this.props.handleUserLogin(boolean);
            // this.props.setUserId()
          });
        }
      })
      .catch(err => {
        this.setState({ showAlert: true, alertMessage: err || "Error :(" });
        console.log("API.userLogin returned error: ", err);
      });
  };

  //  register user function that will be called in the handle form submit function
  registerUser = newUser => {
    API.regUser(newUser)
      .then(res => {
        /// show validation error Alertp if response returned any errors
        if (res.data.errors) {
          this.setState({ showAlert: true, alertMessage: res.data.message });
        } else {
          let parsedId = { id: this.props.getCookie() };
          //   this is where we redirect to a new endpoint using the new userid, or atleast calling a function passing the new id
          // console.log("response from registering new user: ", parsedId);
          API.checkUser(parsedId).then(response => {
            // console.log("loggedIn? ", response.data.loggedin);
            let boolean = response.data.loggedin;
            this.props.handleUserLogin(boolean);
          });
        }
      })
      .catch(err => {
        let errMessage = "There was an error! :(";
        if (typeof err === "string") {
            errMessage = err;
        }
        this.setState({ showAlert: true, alertMessage: errMessage });
        console.log("API.regUser returned error: ", err);
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

  // show/close Register modal
  handleRegShow = (e) => {
    e.preventDefault();
    console.log("trying to show register modal")
    this.setState({ showRegister: true });
    this.resetLoginForm(true);

  }

  handleRegClose = () => this.setState({ showRegister: false });

  // show/close Login modal
  handleLogShow = () => {
    this.setState({ showLogin: true });
    this.resetLoginForm(true);
  }
  
  handleLogClose = () => this.setState({ showLogin: false });

  // clears input controls and user validation UI alert
  resetLoginForm = (reset) => {
    if (reset) {
      this.setState({
        regUsername: "",
        regEmail: "",
        regPassword: "",
        logUsername: "",
        logPassword: "",
        showAlert: false,
        alertMessage: ""
      });
    };
  }

  render() {

    return (

      <div className="login-page-wrapper">
        <div className="company-logo">Resource Center</div>
        <div className="login-background"/>
        
        <TransitionGroup>
            {this.state.showLogin && 
            <CSSTransition
                key="login1"
                classNames="login"
                timeout={300}
            >
                <LoginForm
                  className="login-form"
                  handleInputChange={this.handleInputChange}

                  logUsername={this.state.logUsername}
                  logPassword={this.state.logPassword}
                  handleLoginSubmit={this.handleLoginSubmit}

                  showRegister={this.state.showRegister}
                  handleRegShow={this.handleRegShow}
                  handleRegClose={this.handleRegClose}
                  regEmail={this.state.regEmail}
                  regUsername={this.state.regUsername}
                  regPassword={this.state.regPassword}
                  handleRegSubmit={this.handleRegSubmit}

                  showAlert={this.state.showAlert}
                  alertMessage={this.state.alertMessage}

                  resetLoginForm={this.resetLoginForm}
                />
            </CSSTransition>}
        </TransitionGroup>

      </div>
    );
  }
}
