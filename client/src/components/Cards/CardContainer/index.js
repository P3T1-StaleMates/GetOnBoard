import React from "react";
import EventCard from "../EventCard";
import './CardContainer.css';

const CardContainer = () => {
    return(
   
        <div className="row container-card">
        <div><EventCard/></div>
        <div><EventCard/></div>
        <div><EventCard/></div>
        </div>
   
    )
};

export default CardContainer;