import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import API from "../../utils/API";

export default class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      link: "",
      category: "",
      description: ""
    };
  }

  // functions

  componentDidMount() {
    this.setState({
      id: this.props.resource.id || "",
      title: this.props.resource.title || "",
      link: this.props.resource.link || "",
      category: this.props.resource.category || "",
      description: this.props.resource.description || ""
    });
  }

  //    input change
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  //   handle submit
  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.title === "" ||
      this.state.link === "" ||
      this.state.category === "" ||
      this.state.description === ""
    ) {
      alert("Please fill out every form field please!");
    }
    let newResource = {
      title: this.state.title,
      link: this.state.link,
      category: this.state.category,
      description: this.state.description
    };
    console.log(newResource);
    let id = e.target.id;
    API.editResource(id, newResource).then(res => console.log(res));
    this.props.handleClose();
    this.props.updateState();

    // this.props.updateState();
  };

  // rendering
  render() {
    return (
      <>
        <Form>
          <Form.Group controlId="newResourceTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="newResourceLink">
            <Form.Label>Link</Form.Label>
            <Form.Control
              as="input"
              name="link"
              value={this.state.link}
              onChange={this.handleInputChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="newResourceCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
            >
              <option>....</option>
              <option>Admin</option>
              <option>Sales</option>
              <option>Accounting</option>
              <option>Human Resources</option>
              <option>Shipping and Receiving</option>
              <option>Vendors</option>
              <option>Information and Technology</option>
              <option>Food</option>
              <option>Commute</option>
              <option>Extracurricular</option>
              <option>Misc</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description...</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={this.state.description}
              name="description"
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="outline-success"
            onClick={this.handleSubmit}
            id={this.state.id}
          >
            Edit Resource{" "}
          </Button>
        </Form>
      </>
    );
  }
}
