// card component for players - used in friendslist, groups, dashboards

const PlayerCard = (props) => {
    // needs to display player information
    const { username, avatar, commonGroups } = props;

    return (
        <div className="card" style={{ width: "15rem" }}>
            <img
                src={avatar}
                className="card-img-top"
                alt={username}
            />
            <div className="card-body">
                <h5 className="card-title">Username: {username}</h5>
                <p className="card-text">Groups in Common: {commonGroups}</p>
            </div>
        </div>
    );
};


export default PlayerCard