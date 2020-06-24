import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import Home from "../pages/Home";
import Recent from "../pages/Recent";
import Favorites from "../pages/Favorites";
import API from "../utils/API";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Home",
      userId: "",
      userName: "",
      categArr: []
    };
  }

  componentDidMount() {
    console.log(this.props.getCookie());
    this.setState({ userId: this.props.getCookie()});
    this.getUsername(this.props.getCookie());
    this.getAllResources();
    // find all from the resource collection
  }


  // get username of current logged in user
  getUsername = (userId) => {
    API.getUsername(userId)
      .then(res => {
      console.log("results from axios API call to get user: ", res);
      let userName=res.data.username;
      this.setState({ userName: userName })
      })
      .catch(err => {
      console.log(err);
      });
  };

  // get all categories to set state to pass props to Home component.
  getAllResources = () => {
    API.getAllResources()
      .then(res => {
        this.setState({ categArr: res.data})
      })
      .catch(err => {
        console.log(err);
      });
  }


  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return <Home 
      userName={this.state.userName}
      categArr={this.state.categArr}
      />;
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
