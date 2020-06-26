import React from "react";
import Image from "react-bootstrap/Image";
import "./style.css";


export default function categicon(props) {
    return (
        <div className="cat-box">
            <Image src="./images/polygon.png" className="polygon" id={props.id} onClick={props.onClick} cat={props.cat} />
            <div className="caption">
                <p>{props.title}</p>
            </div>
        </div>
    )
}