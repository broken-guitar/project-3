import React from "react";
import Image from "react-bootstrap/Image";
import "./style.css";


export default function Item(props) {
    return (
        <div className="item-box">
            <Image src="./images/Rectangle.png" className="rectangle" id={props.id} onClick={props.onClick} cat={props.item} />
            <div className="caption">
                <p>{props.title}</p>
            </div>
        </div>
    )
}