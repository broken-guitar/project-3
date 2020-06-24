import React from "react";
import Categicon from "../components/categicon/categicon.js";
import Sectiontitle from "../components/sectiontitle/sectiontitle.js";



export default function Home(props) {


    return (
        <>
            <h1 className="welcoming">Welcome, {props.userName}</h1>
            <Categicon></Categicon>
            <Sectiontitle></Sectiontitle>
        </>
    )
}