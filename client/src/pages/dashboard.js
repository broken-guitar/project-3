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
      categArr: [],
      categArrUnique: []
    };
  }

  componentDidMount() {
    console.log(this.props.getCookie());
    this.setState({ userId: this.props.getCookie() });
    this.getUsername(this.props.getCookie());
    this.getAllResources();
    // find all from the resource collection
  }

  // get username of current logged in user
  getUsername = userId => {
    API.getUsername(userId)
      .then(res => {
        console.log("results from axios API call to get user: ", res);
        let userName = res.data;
        this.setState({ userName: userName });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // get all resources/categories to set state to pass props to Home component.
  getAllResources = () => {
    API.getAllResources()
      .then(res => {

        // return ALL resource database data and set to state categArr
        this.setState({ categArr: res.data });
        console.log("Response with resource data: ", res.data);

        // loop through res data for duplicate category array
        let initialArray = [];
        for (let i = 0; i < res.data.length; i++) {
          // console.log("looped! " + res.data[i].category);
          initialArray.push(res.data[i].category);
        }
        console.log("Initial Array: " + initialArray)

        // save unique category array to state categArrUnique
        let uniqueArray = this.unique(initialArray);
        this.setState({ categArrUnique: uniqueArray });
        console.log("Category Array: " + uniqueArray);
        console.log("Category Array type: " + typeof uniqueArray);
        this.state.categArrUnique.map(cat => console.log(cat))
      })
      .catch(err => {
        console.log(err);
      });
  };

  // contains function to check whether a value is contained within an array 
  // used for unique function to generate unique category array
  contains = (v, arr) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === v) {
        // console.log("remove this! " + v);
        return true;
      }
      return false;
    }
  };

  // unique function, which outputs unique values of an array 
  // used for unique category array - also removes undefined values
  unique = (array) => {
    let new_array = [];
    for (var i = 0; i < array.length; i++) {
      if ((!this.contains(array[i], new_array)) && (array[i] !== undefined)) {
        new_array.push(array[i]);
        // console.log("this was added! " + array[i]);
      }
    }
    return new_array;
  };


  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return (
        <Home userName={this.state.userName} categArr={this.state.categArr} categArrUnique={this.state.categArrUnique} />
      );
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
          logout={this.props.logout}
        ></Navbar>
        {this.renderPage()}
      </>
    );
  }
}
