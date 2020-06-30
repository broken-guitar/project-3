import React, { Component } from "react";
import API from "../utils/API";
import ResourceItem from "../components/Resource/Resource";
import { Button } from "react-bootstrap";

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  //   when favorites page loads...
  componentDidMount() {
    console.log("time to load favorites from User db bro");
    console.log(this.props.getCookie());
    this.getFavorites(this.props.getCookie());
  }

  //   call api to get favorites from user db
  getFavorites = (UserId) => {
    API.getFavorites(UserId)
      .then((res) => {
        this.setState({ favorites: res.data });
        console.log("FAVORITES YO", this.state.favorites);
      })
      .catch((err) => console.log(err));
  };

  // rendering the delete button
  renderDeleteFav = () => {
    return <Button variant="danger">Delete Fav</Button>
  };

  //   rendering
  render() {
    return (
      <>
        <h1>Placeholder: We're at the favorites page</h1>
        <div className="resource-container">
          {this.state.favorites.map((resource) => (
            <ResourceItem
              title={resource.title}
              key={resource._id}
              id={resource._id}
              link={resource.link}
              description={resource.description}
              renderBtn={this.renderDeleteFav}
            />
          ))}
        </div>
      </>
    );
  }
}
