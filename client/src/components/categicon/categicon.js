import React from "react";
import Image from "react-bootstrap/Image";
import "./style.css";


export default function categicon(props) {
    return (
        <div className="cat-box">
            <a href={props.link} target="_blank" rel="noopener noreferrer">
                <Image src="./images/polygon.png" className="polygon" id={props.id} />
                <div className="caption">
                    <p>{props.title}</p>
                </div>
            </a>
        </div>
    )
}