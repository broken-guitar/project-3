import React from "react";
import { Button } from "react-bootstrap";
import {RiDeleteBin5Line} from "react-icons/ri"

export default function deleteFavorite(props) {
  // functions

  return (
    <Button id={props.id} variant="outline-danger" className="mr-2" onClick={props.delete}>
      <RiDeleteBin5Line onClick={props.delete} id={props.id}></RiDeleteBin5Line>
    </Button>
  );
}
