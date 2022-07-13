import "./GameCard.css";
// card component for games

const GameCard = ({ game }) => {
    let stockImage =
        "https://image.shutterstock.com/image-photo/letter-tiles-spelling-out-words-260nw-1509215651.jpg";
    return (
        <div className="card" style={{ width: "15rem" }}>
            <img
                src={game.imageUrl || stockImage}
                className="card-img-top"
                alt="description"
            />
            <div className="card-body">
                <h5 className="card-title">Title of game: {game.title}</h5>
                <p className="card-text">{`#ofplayers: ${`${game.minPlayer} - ${game.maxPlayer}`} Gamelength: ${
                    game.averageTime
                }`}</p>
            </div>
        </div>
    );
};

export default GameCard;
