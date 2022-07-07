// component for navigating the site
import React from 'react';

import { Link } from 'react-router-dom'

import Auth from '../../../utils/auth';

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="col-2">

      <img
        className="brand-logo padding-top-20 logo"
        src="assets/images/Get-on-Board.png"
        alt="Get On Board Logo"
      ></img>
      {Auth.loggedIn() ? (
        <>
          <ul className="nav flex-column padding-top-60">
            <li className="nav-item">
              <Link className="nav-link active" to={`/dashboard`}>My Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/myfriends">My Friends</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mygames">My Games</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createevent">Schedule Meet Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/abouttheteam">About</Link>
            </li>
          </ul>
          <div className="padding-top-280">
            <button type="button" className=" btn-clear center" onClick={logout}>Log Out</button>
          </div>
        </>
      ) : (
        <>
          <ul className="nav flex-column padding-top-60">
            <li className="nav-item">
              <Link className="nav-link active" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/signup">
                Signup
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Navbar;
