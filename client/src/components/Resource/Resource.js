import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaLink } from "react-icons/fa";
import "./style.css";
import EditButton from "../editBtn/editBtn";

// OPTION: define several different components for each resource type here

export default function ResourceItem(props) {
  return (
    <div className="item-box">
      <Card style={{ width: "18rem", height: "17rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title style={{ color: "#ff9a76" }}>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            className="mr-2"
            href={props.link}
            target={"_blank"}
            variant="outline-primary"
          >
            <FaLink href={props.link}></FaLink>
          </Button>
          {/* rendering the addfav button here for the home */}
          {props.renderBtn(props.id)}
          <EditButton
            updateState={props.updateState}
            id={props.id}
          ></EditButton>
          {props.renderDeleteBtn() === false ? (
            <></>) :
            (<>
              {props.renderDeleteBtn(props.id)}
            </>
            )}
        </Card.Footer>
      </Card>
      {/* <Image
        src="./images/Rectangle.png"
        className="rectangle"
        id={props.id}
        onClick={props.onClick}
        cat={props.item}
      />
      <div className="caption">
        <p>{props.title}</p>
      </div> */}
    </div >
  );
}
