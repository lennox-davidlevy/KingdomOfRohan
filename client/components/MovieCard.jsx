import React from 'react';
import HoverComponent from './HoverComponent.jsx';
import Schedule from './Schedule.jsx';

var MovieCard = (props) => {
  //defensive check to make sure a movie was passed as props before rendering a card
  if (props.movie === null) return (<div></div>);

  //gather all the moods assigned to the movie and map them below to display on card
  let moods = props.movie.moods || [];
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-2by3">
          <img src={'https://image.tmdb.org/t/p/w500' + props.movie.poster_path} alt="Placeholder image" />
        </figure>
      </div>

      <HoverComponent user={props.user} movie={props.movie} />
      <div className="card-content">
        <p className="is-size-6">{props.movie.original_title}</p>
        <p className="is-size-7">{props.movie.release_date}</p>
        <div className="tags content">
          {moods.map((mood) =>
            <span className="tag is-primary" key={mood} >{mood}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};


export default MovieCard;
