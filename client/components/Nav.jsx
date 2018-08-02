import React from 'react';
import { Link } from 'react-router-dom';


var Nav = (props) => {
  if (props.loggedIn === true) {
    return (
      <div className="tabs">
        <ul>
          <span><b>Moodvie</b></span>
          <Link to="/global">Mood Search</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/schedule">Schedule</Link>

          <Link onClick={props.handleLogout} to="/logout">Logout</Link>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="tabs">
        <ul>
          <span><b>Moodvie</b></span>
          <Link to="/global">Mood Search</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </ul>
      </div>
    );
  }

};

export default Nav;
