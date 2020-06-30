import React, { Component } from "react";
import Categicon from "../components/categicon/categicon.js";
import ResourceItem from "../components/Resource/Resource.js";
import { Button, Modal } from "react-bootstrap";
import API from "../utils/API.js";
import AddFavorite from "../components/addFavorite/addFavorite.js";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Home",
      userId: "",
      userName: "",
      categArr: [],
      categArrUnique: [],
      currentCateg: "",
      show: false,
      setShow: false,
      modalResId: "",
      modalRes: {},
      sortedResources: [],
    };
  }

  // const [show, setShow] = useState(false);

  handleClose = () => this.setState({ show: false });

  handleShow = (event) => {
    event.preventDefault();
    this.setState({ show: true });
    this.setState({ modalResId: event.target.id });
    this.setState({ currentCateg: event.target.id });
    console.log("current category" + this.state.currentCateg);
    // this.getResourceById(event.target.id);
    this.getByCategory(event.target.id);
  };

  // get one resource by id
  getResourceById = (rscId) => {
    console.log("getRes func ID ", rscId);
    API.getResourceById(rscId)
      .then((res) => {
        console.log(res);
        this.setState({ modalRes: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get all resources by category
  getByCategory = (category) => {
    API.getAllByCategory(category)
      .then((res) => {
        console.log(res.data);
        this.setState({ sortedResources: res.data });
      })
      .catch((err) => console.log(err));
  };

  // update state after adding new resource
  updateResState = (rsc) => {};

  // favorite button click
  onClick = (event) => {
    let resourceId = event.target.id;
    console.log("favorites button on click:", resourceId);
    API.addFavorite(resourceId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // renddering addFavorite button into resource items
  renderAddFav = (category) => {
    return <AddFavorite category={category} onClick={this.onClick}></AddFavorite>;
  };

  render() {
    return (
      <div>
        <br />
        <h1 className="welcoming">Welcome, {this.props.userName}</h1>
        <br />
        <div className="category-container">
          {this.props.categArrUnique.map((cat) => (
            <Categicon
              key={cat}
              id={cat}
              title={cat}
              // type={cat.type}
              // link={cat.link}
              cat={cat}
              onClick={this.handleShow}
            />
          ))}
        </div>

        <br />
        <h2 className="welcoming">Prior mapping tool</h2>
        <br />
        {/* container for rendering all user's categories/resource items */}
        <div className="category-container">
          {this.props.categArr.map((cat) =>
            cat.type === "Category" ? ( // render Category and Resource with separate components
              <Categicon
                key={cat._id}
                id={cat._id}
                title={cat.title}
                type={cat.type}
                // link={cat.link}
                cat={cat}
                onClick={this.handleShow}
              />
            ) : (
              <ResourceItem
                key={cat._id}
                id={cat._id}
                description={cat.description}
                link={cat.link}
                title={cat.title}
                renderBtn={this.renderAddFav}
                onClick={this.handleShow}
              />
            )
          )}
        </div>

        {/* Modal to show the clicked item contents
            OPTION: move this to a separate component so we can pass props and reuse for different item types*/}
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            {this.state.currentCateg === undefined ? (
              <Modal.Title>{this.state.modalRes.title}</Modal.Title>
            ) : (
              <Modal.Title>{this.state.currentCateg}</Modal.Title>
            )}
          </Modal.Header>

          <Modal.Body
            style={{
              backgroundImage: "url(" + (this.state.modalRes.link || "") + ")",
              backgroundSize: "contain",
              minHeight: "300px",
            }}
          >
            {/* resource content can go here */}
            {this.state.sortedResources.map((rsc) => {
              return (
                <ResourceItem
                  key={rsc._id}
                  id={rsc._id}
                  description={rsc.description}
                  link={rsc.link}
                  title={rsc.title}
                  renderBtn={this.renderAddFav}
                  onClick={this.handleShow}
                ></ResourceItem>
              );
            })}
            <p>hello</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
