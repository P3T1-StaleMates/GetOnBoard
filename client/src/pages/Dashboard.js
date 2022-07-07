import GameCard from "../components/Cards/GameCard";
import PlayerCard from "../components/Cards/PlayerCard";
import EventCard from "../components/Cards/EventCard";// user dashboard - holds other displays inside

const PlayerDash = () => {
    return(
        <>
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
        </>
    )
}

export default PlayerDash