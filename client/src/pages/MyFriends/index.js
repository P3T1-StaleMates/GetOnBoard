import PlayerCard from "../../components/Cards/PlayerCard";
import AddFriendSmall from "./Components/AddFriend";
import "./MyFriends.css";

import { /*Redirect,*/ useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_PLAYER, QUERY_ME } from "../../utils/queries";

// import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_PLAYER : QUERY_ME, {
    variables: { username: userParam },
  });

  // console.log(loading)
  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log("data", data)
  const { friends } = data.me;
  // console.log("friends", friends)



  // Will use if we get to the point of displaying other users profiles.

  // const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  //   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //     return <Redirect to="/me" />;
  //   }

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (!user?.username) {
  //     return (
  //       <h4>
  //         You need to be logged in to see this. Use the navigation links above to
  //         sign up or log in!
  //       </h4>
  //     );
  //   }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col padding-40">
          <img
                className="icon"
                src="/assets/images/chess/chess-orange.png"
                alt="Avatar"
                height="80"
              />
            <div>
              <h5>My Friends</h5>
              <p>Check out all your friends!</p>
            </div>
          </div>
          <div className="col p-3">
            <AddFriendSmall />
          </div>
        </div>
      </div>
      <section className="overflow">
        <div className="container ">
          <div className="row">
            {friends.map((friend) => (
              <div className="col-4" key={friend._id}>
                <PlayerCard info={friend} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
