// card component for games

const GameCard = (props) => {
    // needs to display game information

    const { title, players, timeLength, imgUrl } = props;

    return (
        <div className="card" style={{ width: "15rem" }}>
            <img
                src={imgUrl}
                className="card-img-top"
                alt="description"
            />
            <div className="card-body">
                <h5 className="card-title">Title of game: {title}</h5>
                <p className="card-text">{`#ofplayers: ${players} Gamelength: ${timeLength}`}</p>
                {/* <a href="#"></a> */}
            </div>
        </div>
    );
};

export default GameCard;
