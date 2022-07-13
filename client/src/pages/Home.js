import React from "react";
import GameCard from "../components/Cards/GameCard";
import PlayerCard from "../components/Cards/PlayerCard";
import EventCard from "../components/Cards/EventCard";


const Home = () => {
    return (
        <main className="bg-white mt-5 mb-5 mrl-20">

  <div className="container">
    <div className="row">
      <div className="col-2">
 
        <img
        href="#"
            className="brand-logo padding-top-20 logo"
            src="assets/images/Get-on-Board.png"
          />
          <ul className="nav flex-column padding-top-60">
            <li className="nav-item">
              <a className="nav-link active" href="#">My Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">My Friends</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Games</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Schedule Meet Up</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">About</a>
            </li>
          </ul>
          <div className="padding-top-280">
          <button type="button" className=" btn-clear center">Log Out</button>
        </div>
        </div>
      

<div className="col-8">
        <div className="bg-cream">
        <section className="padding-40">
        <div className="col"><img className="icon" src="/assets/images/man-icon.jpg" alt="Avatar"/>
          <div>
          <h5>Hello, John Doe!</h5>
          <p>Welcome back let's Get on Board</p>
          </div>
          </div>
        </section>

        <section>
        
          <div className="container">
            <div className="row">
              <div className="col"> <GameCard/></div>
              <div className="col"><GameCard/></div>
              <div className="col"><GameCard/></div>
            </div>
            <div className="row">
              <div className="col-8">large-card</div>
              <div className="col-4">small-card</div>
            </div>
          </div>
          
        </section>
        </div>
      </div>

 
  

  

      <div className="col-2">
       
        <div className="container">
          <div className="row">
            <section>
          
            </section>
           

       
          </div>
          <div className="row">
            <div className="col">
            
            </div>
          </div>
        </div>
      </div>
    </div>
 

</div>
    </main>
    );
};

export default Home;
