import "./GameCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { REMOVE_GAME } from "../../../utils/mutations";
import { useMutation } from '@apollo/client';
// card component for games

const GameCard = ({ game }) => {
    const [removeGame, { error }] = useMutation(REMOVE_GAME);

  const handleRemoveGame = async (gameId) => {
    try {
      const { removedGame } = await removeGame({
        variables: { gameId }
      })
    } catch (err) {
      console.error(err);
    }
  }
let stockImage = "https://image.shutterstock.com/image-photo/letter-tiles-spelling-out-words-260nw-1509215651.jpg"
    return (
        <div className="card game" style={{ width: "15rem" }}>
            <img src={game.imageUrl || stockImage} className="card-img-top" alt="description" />
            <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">{`Players: ${`${game.minPlayer} - ${game.maxPlayer}`} `}</p>
                <p>{`Game Length: ${game.averageTime} min`}</p>
                <button className="btn-danger" onClick={() => handleRemoveGame(game._id)}><FontAwesomeIcon icon="fa-solid fa-trash fa-2xl" /></button>
            
            </div>
        </div>
    );
};

export default GameCard;
