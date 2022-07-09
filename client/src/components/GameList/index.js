// container that renders game cards - used for player-owned games, as well as amasses group games
import SearchBar from "../Searchbar";
import GameCard from "../Cards/GameCard";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const GameList = () => {
     const { loading, data } = useQuery(QUERY_ME);
     if (loading) {
          return <div>Loading...</div>;
     }
     console.log("data", data);

     const { ownedGames } = data.me;

     return (
          <>
               {/*In here goes the logic to render all the game cards, plus whatever styling we need, like a scrollbar */}
               <SearchBar />
               {ownedGames.map(game => <GameCard data={game} />)}
          </>
     );
};

export default GameList;
