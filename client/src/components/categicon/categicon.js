import React from "react";
import Image from "react-bootstrap/Image"

export default function categicon() {
    return (
        <>
            <Image src="./images/polygon.png" className="polygon" />
            <div className="caption">
                <p>Category Title</p>
            </div>
        </>
    )
}