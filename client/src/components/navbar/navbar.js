import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

export default function navbar(props) {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand href="#home" onClick={() => props.handlePageChange("Home")}>
        Resource Center
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            href="#recent"
            onClick={() => props.handlePageChange("Recent")}
          >
            Recent
          </Nav.Link>
          <Nav.Link
            href="#favorite"
            onClick={() => props.handlePageChange("Favorites")}
          >
            Favorites
          </Nav.Link>
          <Button
            variant="outline-dark"
            onClick={() => {
              props.logout();
            }}
          >
            Logout
          </Button>
        </Nav>
        {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
