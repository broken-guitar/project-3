import React, { Component } from "react";
import "./App.css";
// import Navbar from "./components/navbar/navbar";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" exact component={RegisterPage} />
          <Route exact path="/loginPage" exact component={LoginPage} />
        </Router>
      </div>
    );
  }
}

export default App;
