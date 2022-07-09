const AddFriend = (props) => {
    // needs to display game information

    const { title, players, timeLength, imgUrl } = props;

    return (
        <div className="card" style="width: 15rem;">
            <img
                src="/assets/images/dice-and-pawns.jpg"
                className="card-img-top"
                alt="..."
            />
            <div className="card-body">
                <h5 className="card-title">
                    LET'S <br /> EXPLORE!
                </h5>
                <p className="card-text">Find and add more games</p>
                <button type="button" className="btn center">
                    EXPLORE
                </button>
            </div>
        </div>
    );
};

export default AddFriend;
