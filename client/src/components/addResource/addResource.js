import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import API from "../../utils/API";

export default class AddResourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "",
      category: "",
      description: ""
    };
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
    let newResource = {
      title: this.state.title,
      type: this.state.type,
      category: this.state.category,
      description: this.state.description
    };
    console.log(newResource);
    API.addNewResource(newResource).then(res => console.log(res));
    this.props.handleClose();
  };

  //   rendering
  render() {
    return (
      <>
        <Form>
          <Form.Group controlId="newResourceTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="title"
              placeholder="New Resource Title..."
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="newResourceType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              onChange={this.handleInputChange}
            >
              <option>....</option>
              <option>Link</option>
              <option>Note</option>
              <option>Contact</option>
              <option>Document</option>
              <option>Image</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="newResourceCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              onChange={this.handleInputChange}
            >
              <option>....</option>
              <option>Admin</option>
              <option>Sales</option>
              <option>Accounting</option>
              <option>Human Resources</option>
              <option>Shipping/Receiving</option>
              <option>Maintenance</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description...</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="outline-success"
            onClick={this.handleSubmit}
          >
            Submit New Resource{" "}
          </Button>
        </Form>
      </>
    );
  }
}
