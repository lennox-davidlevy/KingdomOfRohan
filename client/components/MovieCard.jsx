import React from 'react';
import HoverComponent from './HoverComponent.jsx';
import Schedule from './Schedule.jsx';




class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderOptions: false,
    };
    this.showOptions = this.showOptions.bind(this);
  }


  showOptions() {
    this.setState({
      renderOptions: !this.state.renderOptions
    });
  }







  render() {
    let moods = this.props.movie.moods || [];
    if (this.props.movie === null) return (<div></div>);
    return (
      <div>

        <div onMouseEnter={() => this.showOptions()} onMouseLeave={() => this.showOptions()} className="card">

          <div className="card-image">


            <figure className="image is-2by3">

              <img src={'https://image.tmdb.org/t/p/w500' + this.props.movie.poster_path} alt="Placeholder image" />
              {this.state.renderOptions &&
                <HoverComponent user={this.props.user} movie={this.props.movie} />
              }
            </figure>
          </div>
          <div className="card-content">
            <p className="is-size-6">{this.props.movie.original_title}</p>
            <p className="is-size-7">{this.props.movie.release_date}</p>
            <div className="tags content">
              {moods.map((mood) =>
                <span className="tag is-primary" key={mood} >{mood}
                </span>
              )}
            </div>
          </div>
        </div>

      </div>



    );
  }
}



export default MovieCard;
