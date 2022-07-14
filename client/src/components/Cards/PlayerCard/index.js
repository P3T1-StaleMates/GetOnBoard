// card component for players - used in friendslist, groups, dashboards
import { useMutation } from "@apollo/client";
import { REMOVE_FRIEND } from "../../../utils/mutations";
import "./PlayerCard.css";
const PlayerCard = (props) => {
    // needs to display player information
    const { username } = props.info;

    const [removeFriend, { error }] = useMutation(REMOVE_FRIEND);

    const removeFriendId = props.info._id;

    const handleFriendDelete = async () => {
        try {
            await removeFriend({
                variables: { removeFriendId },
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
       
            <div className="card mb-4 zoom " style={{ width: "15rem" }}>
                <img
                    src="/assets/images/chess/chess-pink.png"
                    className="card-image card-img-top"
                    alt={username}
                />
                <div className="card-body ">
                    <h5 className="card-title">{username}</h5>
                    {/* <p className="card-text">Groups in Common: </p> */}
                </div>

                <button className="center mb-3 btn-red" onClick={handleFriendDelete}>Remove Friend</button>
            </div>
            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    Unable to locate a user with that username.
                </div>
            )}
            
        </>
    );
};

export default PlayerCard;
