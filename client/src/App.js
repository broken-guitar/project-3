import React, { Component } from "react";
import "./App.css";
// import Navbar from "./components/navbar/navbar";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      loggedIn: false,
    };
  }

  // handle user lop in
  handleUserLogin = (user) => {
    console.log("DID IT WORKS?!??", user);
    this.setState({ currentUser: user.user, loggedIn: user.loggedIn });
  };

  // render
  render() {
    const user = this.state.currentUser;
    const loggedIn = this.state.loggedIn;
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* <Route
              path="/"
              render={(props) => (
                <RegisterPage handleUserLogin={this.handleUserLogin} />
              )}
            /> */}
            <Route exact path="/">
              {loggedIn ? (
                <Redirect to={"/dashboard/" + user} />
              ) : (
                <RegisterPage handleUserLogin={this.handleUserLogin} />
              )}
            </Route>
            <Route exact path="/loginPage" component={LoginPage} />
            <Route exact path="/dashboard/:id" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
