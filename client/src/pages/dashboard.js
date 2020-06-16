import React, { Component } from "react";
import Navbar from "../components/navbar/navbar"

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<Navbar></Navbar>)
  }
}
