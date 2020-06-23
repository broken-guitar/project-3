import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import Home from "../pages/Home";
import Recent from "../pages/Recent";
import Favorites from "../pages/Favorites";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Home"
    };
  }

  componentDidMount() {
    console.log(this.props.getCookie());
    // find all from the resource collection
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return <Home />;
    } else if (this.state.currentPage === "Recent") {
      return <Recent />;
    } else {
      return <Favorites />;
    }
  };

  render() {
    return (
      <>
        <Navbar
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        ></Navbar>
        {this.renderPage()}
      </>
    );
  }
}
