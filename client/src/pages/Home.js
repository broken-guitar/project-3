import React, { Component } from "react";
import Categicon from "../components/categicon/categicon.js";
import AddFavorite from "../components/addFavorite/addFavorite";
import ResourceItem from "../components/Resource/Resource.js";
import { Button, Modal } from "react-bootstrap";
import API from "../utils/API.js";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Home",
      userId: "",
      userName: "",
      categArr: [],
      show: false,
      setShow: false,
      modalResId: "",
      modalRes: {}
    };
  }

  // const [show, setShow] = useState(false);

  handleClose = () => this.setState({ show: false });

  handleShow = event => {
    event.preventDefault();
    this.setState({ show: true });
    this.setState({ modalResId: event.target.id });
    this.getResourceById(event.target.id);
  };

  getResourceById = rscId => {
    console.log("getRes func ID ", rscId);
    API.getResourceById(rscId)
      .then(res => {
        console.log(res);
        this.setState({ modalRes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // favorite button click

  onClick = () => {
    let resourceId = this.state.modalResId;
    console.log("favorites button on click:", resourceId);
    API.addFavorite(resourceId)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <br />
        <h1 className="welcoming">Welcome, {this.props.userName}</h1>
        <br />

        {/* container for rendering all user's categories/resource items */}
        <div className="category-container">
          {this.props.categArr.map(cat =>
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
                title={cat.title}
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
            <Modal.Title>{this.state.modalRes.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              backgroundImage: "url(" + (this.state.modalRes.link || "") + ")",
              backgroundSize: "contain",
              minHeight: "300px"
            }}
          >
            {/* resource content can go here */}
          </Modal.Body>
          <Modal.Footer>
            <AddFavorite onClick={this.onClick}></AddFavorite>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
