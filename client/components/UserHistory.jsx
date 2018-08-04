import React from 'react';
import MovieCard from './MovieCard.jsx';

var UserHistory = (props) => {
  //first check if the logged in user has user history, if so, render that history
  //if not, render an empty div
  if (props.history[0] !== null) {
    return (
      <div className="column is-one-fifth">
        <p className="has-text-grey">Recently Added</p>
        {props.history.map((movie) => {
          return (
            <div style={{ margin: '15px' }} >
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (<div></div>);
  }
};

export default UserHistory;
