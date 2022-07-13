// user dashboard - holds other displays inside
import GameCard from "../components/Cards/GameCard";
import CardContainer from "../components/Cards/CardContainer";
import SearchBar from "../components/Searchbar";
import AddFriend from "../components/AddFriend";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

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
                  <div className="col">
                    {" "}
                    <GameCard key={game._id} game={game} />
                  </div>
                );
              })
            ) : (
              <SearchBar />
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
