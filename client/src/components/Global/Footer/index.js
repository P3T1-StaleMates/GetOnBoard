import React from "react";
import { Link } from "react-router-dom";
import "../Footer/footer.css";

const Footer = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="padding-top-40 nw-img">
                        {" "}
                        
                          <a href="https://bootcamp.northwestern.edu/coding/">
                          <img
                            className="nw-img"
                            src="/assets/images/CodeBootcamp.png"
                            alt="team member"
                        />
                          </a>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
