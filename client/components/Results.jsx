import React from 'react';
import MovieCard from './MovieCard.jsx';

var Results = (props) => {
  // console.log('results props:', props);
  return (
    <div className="container is-fluid">
      <div className="columns is-multiline">
        {props.movies.length !== 0 ? props.movies.map((movie) => {
          return (<div className="column is-one-fifth">
            <MovieCard user={props.user} movie={movie} moods={props.moods}/>
          </div>)
        })
          :
          <div>No movies found for this combination</div>}
      </div>
    </div>
  );
};

export default Results;
