// user dashboard - holds other displays inside
import ModalGameCard from "../components/Cards/ModalGameCard";
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
      <section className="padding-welcome">
        <div className="col">
          <img
            className="icon"
            src="/assets/images/man-icon.jpg"
            alt="Avatar"
          />
          <div className="ps-3">
            <h5>Hello, {name}!</h5>
            <p>Welcome back to Get on Board</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">

          <div className="row">
            <div className="col-8">
              <section>
                <div className="d-flex justify-content-center">
                  <h3 className="text-purple">Upcoming Events</h3>
                </div>
                <CardContainer />
              </section>
            </div>
            <div className="col-4">
              <section>
                <div className="d-flex justify-content-center">
                  <h3 className="text-fuchsia">Quick add a new friend!</h3>
                </div>
                <AddFriend />
              </section>
            </div>
          </div>
        </div>

        <div className="row dashGames">
          {ownedGames.slice(0, 3).map((game) => (

            <>
              <div className="col-4">

                <ModalGameCard key={game._id} game={game} />
              </div>

            </>

          ))}
          {ownedGames.length <= 2 &&
            <div className="col-4 d-flex justify-content-center text-center">
              <div className="pt-2 pb-2">
                <div>
                  <h3 className="text-blue pb-4">Add Some Games!</h3>
                </div>
                <div>
                  <SearchBar />
                </div>
              </div>
            </div>

          }

        </div>
      </section>
    </>
  );
};

export default Dashboard;
