import React from "react";
import { Alert as BsAlert, Row } from "react-bootstrap";

export default function Alert(props) {

    return (
        <>
            <BsAlert as={Row}
                className="w-100"
                show={props.show}
                variant={props.variant}
                dismissible={props.dismissible === "true" ? true : false}
            >
                {props.header ? <BsAlert.Heading>{props.header}</BsAlert.Heading> : ""}
                {props.message ? <p>{props.message}</p> : ""}
                
            </BsAlert>
        </>
    )
}