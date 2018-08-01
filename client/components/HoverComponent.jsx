import React from 'react';
import Schedule from './Schedule.jsx';

var HoverComponent = (props) => {
  return (
    <div>
      <p>See Similar</p>
      <p>Watch Now</p>
      <p><Schedule user={props.user} movie={props.movie}/></p>
    </div>
  );
};

export default HoverComponent;
