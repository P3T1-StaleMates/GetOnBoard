// card component for games

const GameCard = (props) => {
    // needs to display game information

    const { _id, title, imageUrl, averageTime, minPlayer, maxPlayer } = props;

    return (
        <div className="card" key={_id} style={{ width: "15rem" }}>
            <img src={imageUrl} className="card-img-top" alt="description" />
            <div className="card-body">
                <h5 className="card-title">Title of game: {title}</h5>
                <p className="card-text">{`#ofplayers: ${`${minPlayer} - ${maxPlayer}`} Gamelength: ${averageTime}`}</p>
            </div>
        </div>
    );
};

export default GameCard;
