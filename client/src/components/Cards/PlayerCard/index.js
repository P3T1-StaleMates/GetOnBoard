// card component for players - used in friendslist, groups, dashboards

// import { useMutation } from '@apollo/client';

// import { REMOVE_FRIEND } from '../../../utils/mutations';

const PlayerCard = (props) => {
    // needs to display player information
    const { username } = props.info;
    console.log("props", props)

    // const [removeFriend, { error, data }] = useMutation(REMOVE_FRIEND);

    return (
        <div className="card" style={{ width: "15rem" }}>
            <img
                src="/assets/images/meeple.jpg"
                className="card-img-top"
                alt={username}
            />
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                {/* <p className="card-text">Groups in Common: </p> */}
            </div>
        </div>
    );
};


export default PlayerCard