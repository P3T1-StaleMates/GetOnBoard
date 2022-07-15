import "./ModalGameCard.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { REMOVE_GAME } from "../../../utils/mutations";
// import { useMutation } from '@apollo/client';
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
// card component for games

const ModalGameCard = ({ game }) => {

    let stockImage = "https://image.shutterstock.com/image-photo/letter-tiles-spelling-out-words-260nw-1509215651.jpg"
    return (
        <div className=" gameDash col-4" style={{ width: "15rem" }}>
            <div className="team-member mt-2">

                <div className="team-img d-flex justify-content-center">

                    <img src={game.imageUrl || stockImage} className="card-img-top img-responsive-dash" alt="description"></img>
                </div>
                <div className="game-hover">
                    <div className="desk align-content-center">
                        <h5 className="card-title">{game.title}</h5>
                        <p className="card-text">{`Players: ${`${game.minPlayer} - ${game.maxPlayer}`} `}</p>
                        <p>{`Game Length: ${game.averageTime} min`}</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ModalGameCard;
