import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PLAYER } from '../../utils/mutations';
import '../../styles/signup.css';
import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [addPlayer, { error, data }] = useMutation(ADD_PLAYER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addPlayer({
        variables: { ...formState },
      });

      Auth.login(data.addPlayer.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="padding-40">
    <main className="flex-row p-3 mb-4">
    <div className="padding-40">
       <h1> Welcome to Get On Board!</h1>
       <p>For all your mystical game night desires! Find and save your favorite owned board games and schedule game night meet ups with friends. </p>
        {/* <h2>Get on board and Signup to get started!</h2> */}
        </div>
      <div className="col-6  center col-lg-6">
        <div className="card border-none">
          <h4 className=" text-center">Sign Up</h4>
          <div className="card-body ">
            {data ? (
              <p>
                Success! You may now head the dashboard.
                <Link to="/Dashboard">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input border-btmgreen"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                /><br></br>
                <input
                  className="form-input"
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                /><br></br>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                /><br></br>
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                /><br></br>
                <button
                  className="btn-green btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
    </div>
  );
};

export default Signup;
