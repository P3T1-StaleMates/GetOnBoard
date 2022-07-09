// card component for players - used in friendslist, groups, dashboards

import { useMutation } from '@apollo/client';

import { REMOVE_FRIEND } from '../../../utils/mutations';

import Auth from '../../../utils/auth'

const PlayerCard = (props) => {
    // needs to display player information
    const { username } = props.info;
    console.log("props", props)

    const [removeFriend, { error, data }] = useMutation(REMOVE_FRIEND);

    const handleFriendDelete = async (event) => {
        event.preventDefault();

        const removedFriend=props.info._id

        try {
          const { data } = await removeFriend({
            variables: { removedFriend },
          });

          console.log(data)

          Auth.login(data.addProfile.token);
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <>
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

                <button onClick={handleFriendDelete}>Remove Friend</button>
            </div>
            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}
        </>
    );
};


export default PlayerCard