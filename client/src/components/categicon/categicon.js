import React from "react";
import Image from "react-bootstrap/Image";
import "./style.css";

export default function Categicon(props) {
  return (
    <div className="cat-box">
      <Image
        src="./images/polygon.png"
        className="polygon mr-5 ml-5"
        id={props.category}
        onClick={props.onClick}
        
      />
      <div className="caption">
        <p>{props.category}</p>
      </div>
    </div>
  );
}
