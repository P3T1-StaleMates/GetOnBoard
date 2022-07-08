// container that renders game cards - used for player-owned games, as well as amasses group games
import SearchBar from "../Searchbar";


const GameList = (props) => {
    const { arrayOfGames } = props;

    return (
       <>
            {/*In here goes the logic to render all the game cards, plus whatever styling we need, like a scrollbar */}
            <SearchBar />
       </>
        );
};

export default GameList;
