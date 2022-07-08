import GameCard from "../components/Cards/GameCard";

const MyGames = () => {
    return(
        <>
         <section className="padding-40">
        <div className="col"><img className="icon" src="/assets/images/man-icon.jpg" alt="Avatar"/>
          <div>
          <h5>Dashboard My Groups</h5>
          <p>Welcome, view all groups</p>
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
            <div className="col"> <GameCard/></div>
              <div className="col"><GameCard/></div>
              <div className="col"><GameCard/></div>
            </div>
          </div>
        </section>
        </>
    )
}

export default MyGames