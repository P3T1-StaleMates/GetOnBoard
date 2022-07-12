// user dashboard - holds other displays inside
import GameCard from "../components/Cards/GameCard";
import CardContainer from "../components/Cards/CardContainer";
// import PlayerCard from "../components/Cards/PlayerCard";
// import EventCard from "../components/Cards/EventCard";
import AddFriend from "../components/AddFriend";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_MY_EVENTS } from "../utils/queries";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("loading", loading);

  const { name, ownedGames /*friends*/ } = data.me;
  console.log("games", ownedGames);

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
              <p>No Games to Show! Add your games by searching for them!</p>
            )}
          </div>

          <div className="row">
            <div className="col-8">
              <section>
              <CardContainer />
              </section>
            </div>
          <div className="col-2">
            <section>
            <AddFriend />
            </section>
            </div>
          </div>
          </div>

      </section>
    </>
  );
};

export default Dashboard;
