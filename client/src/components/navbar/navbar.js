import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function navbar(props) {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand href="#home">Resource Center</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Recent</Nav.Link>
          <Nav.Link href="#link">Favorites</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
