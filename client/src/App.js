import React, { Component } from "react";
import "./App.css";
import Cookies from "js-cookie";
// import Navbar from "./components/navbar/navbar";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  // handle user lop in
  handleUserLogin = boolean => {
    console.log("DID IT WORKS?!??", boolean);
    this.setState({ loggedIn: boolean });
  };

  // function to get the cookies from cookie storage if there is one associated with the session
  getCookie = () => {
    if (Cookies.get("id") === undefined) {
      return " ";
    } else {
      return Cookies.get("id").slice(3, -1);
    }
  };

  // render
  render() {
    const loggedIn = this.state.loggedIn;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {/* checks to see if the user is logged in (only is logged in if there is a cookie) if so, render the dashboard page, if not, render the login page. essemtially gate keeps the app so only an authenticated user can access it */}
              {loggedIn ? (
                <Dashboard getCookie={this.getCookie}></Dashboard>
              ) : (
                <LoginPage
                  handleUserLogin={this.handleUserLogin}
                  getCookie={this.getCookie}
                />
              )}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
