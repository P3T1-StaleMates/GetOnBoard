import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PLAYER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_PLAYER : QUERY_ME, {
		variables: { username: userParam },
	});
	console.log(loading)

	console.log(data)

	const user = data?.me || data?.user || {};
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
			<section className="padding-40">
				<div className="col"><img className="icon" src="/assets/images/man-icon.jpg" alt="Avatar" />
					<div>
						<h5>My Friends</h5>
						<p>Check out all your friends!</p>
					</div>
				</div>
			</section>
			<div>
				<div className="flex-row justify-center mb-3">

					<div className="col-12 col-md-10 mb-5">

					</div>
					{!userParam && (
						<div
							className="col-12 col-md-10 mb-3 p-3"
							style={{ border: '1px dotted #1a1a1a' }}
						>

						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Profile;
