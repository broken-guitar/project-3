import React from "react";
import { Button } from "react-bootstrap";

export default function addFavorite(props) {
  // functions

  return (
    <Button variant="outline-info" onClick={props.onClick}>
      Add to Favorites!
    </Button>
  );
}
