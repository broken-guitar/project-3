import React from "react";
import { Button } from "react-bootstrap";
import { FiHeart } from "react-icons/fi";

export default function addFavorite(props) {
  // functions

  return (
    <Button  id = {props.category} variant="outline-info" className="mr-2" onClick={props.onClick}>
      <FiHeart id = {props.category} onClick={props.onClick}></FiHeart>
    </Button>
  );
}
