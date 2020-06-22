import React, { Component } from "react";
import "./App.css";
import Cookies from "js-cookie";
// import Navbar from "./components/navbar/navbar";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/dashboard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

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
    const user = this.getCookie();
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
                <LoginPage
                  handleUserLogin={this.handleUserLogin}
                  getCookie={this.getCookie}
                />
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
