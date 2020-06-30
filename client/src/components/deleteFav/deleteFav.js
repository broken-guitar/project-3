import React from "react";
import { Button } from "react-bootstrap";

export default function deleteFavorite(props) {
  // functions

  return (
    <Button id={props.id} variant="danger" onClick={props.delete}>
      Delete From Favs!
    </Button>
  );
}
