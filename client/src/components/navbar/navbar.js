import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import AddNewBtn from "../addNewBtn/addNewBtn";

export default function navbar(props) {
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand
          href="#home"
          onClick={() => props.handlePageChange("Home")}
        >
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
            <AddNewBtn addNewResource={props.addNewResource} />
            <Button
              variant="outline-dark"
              onClick={() => {
                props.logout();
              }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
