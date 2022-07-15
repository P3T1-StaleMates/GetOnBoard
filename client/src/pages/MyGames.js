import GameCard from "../components/Cards/GameCard";
import Searchbar from "../components/Searchbar";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const MyGames = () => {
    const { loading, data } = useQuery(QUERY_ME);

    if (loading) {
        return <div>Loading....</div>;
    }

    const { ownedGames } = data.me;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col padding-40">
                        <div>
                            <img
                                className="icon"
                                src="/assets/images/chess/chess-orange.png"
                                alt="Avatar"
                                height="80"
                            />
                            <div>
                                <h5>My Games</h5>
                                <p>View all your added games</p>
                            </div>
                        </div>
                    </div>
                    <div className="col p-3">
                        <Searchbar />
                    </div>
                </div>
            </div>

            <section className="overflow">
                <div className="container ">
                    <div className="row ">
                        {ownedGames.length ? (
                            ownedGames.map((game) => {
                                return (
                                    <div className="col-4" key={game.title}>
                                        {" "}
                                        <GameCard game={game} />
                                    </div>
                                );
                            })
                        ) : (
                            <p>
                                No Games to Show! Add a new game by searching
                                for one above!
                            </p>
                        )}
                    </div>
                    <div className="row"></div>
                </div>
            </section>
        </>
    );
};

export default MyGames;
