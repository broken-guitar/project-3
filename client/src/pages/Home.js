import React from "react";
import Categicon from "../components/categicon/categicon.js";
import Sectiontitle from "../components/sectiontitle/sectiontitle.js";



export default function Home(props) {


    return (
        <div>
            <br />
            <h1 className="welcoming">Welcome, {props.userName}</h1>
            <br />
            <div className="category-container">
                {props.categArr.map(cat => (
                <Categicon
                id={cat._id}
                title={cat.title}
                link={cat.link}
                />
                ))}
            </div>
            
            <Sectiontitle></Sectiontitle>
        </div>
    )
}