import React from 'react';
import Schedule from './Schedule.jsx';

var HoverComponent = (props) => {
  return (
    <div className="options">
      <a class="button is-primary">See Similar!</a>
      <a class="button is-primary">Watch Now!</a>
      <a class="button is-primary">Watch Later!</a>
      {/* <p>See Similar</p>
      <p>Watch Now</p> */}
      {/* <div><Schedule user={props.user} movie={props.movie}/></div> */}
    </div>
  );
};

export default HoverComponent;
