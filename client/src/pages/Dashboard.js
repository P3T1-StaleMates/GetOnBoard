// user dashboard - holds other displays inside
import GameCard from "../components/Cards/GameCard";
import CardContainer from "../components/Cards/CardContainer";
// import PlayerCard from "../components/Cards/PlayerCard";
// import EventCard from "../components/Cards/EventCard";
import AddFriend from "../components/AddFriend";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("loading", loading);
  console.log("data", data);

  const { name, ownedGames /*friends*/ } = data.me;
  console.log("games", ownedGames);
  // const { game1 } = ownedGames;

  return (
    <>
      <section className="padding-40">
        <div className="col">
          <img
            className="icon"
            src="/assets/images/man-icon.jpg"
            alt="Avatar"
          />
          <div>
            <h5>Hello, {name}!</h5>
            <p>Welcome back to Get on Board</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            {ownedGames.length ? (
              ownedGames.slice(0, 3).map((game) => {
                return (
                  <div className="col" key={game.title}>
                    {" "}
                    <GameCard game={game} />
                  </div>
                );
              })
            ) : (
              <p>No Games to Show! Add a new game by searching for one!</p>
            )}
          </div>

          <div className="row">
            <div className="col-8">
              <CardContainer />
            </div>
          </div>
          <div className="row">
            <AddFriend />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
