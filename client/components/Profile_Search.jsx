import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.jsx';
import TagMovie from './TagMovie.jsx';
import UserHistory from './UserHistory.jsx';


class Profile_Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movie: '',
      giveMoodButtons: false,
      history: [],
      recs: []
    };
    this.formRef = null;
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.getUserHistory = this.getUserHistory.bind(this);
    this.getUserRecs = this.getUserRecs.bind(this);
    this.hideTagging = this.hideTagging.bind(this);
  }

  //display User History after logging in
  componentDidMount() {
    this.getUserHistory(this.props.user);
  }

  //change state of movie to search input on Change
  handleSearch(e) {
    e.preventDefault();
    this.setState({ movie: e.target.value });
  }

  //after clicking search the corresponding array of movie objects (results) is sent to state in movies
  handleSearchClick(e) {
    e.preventDefault();
    //empties input field after search
    this.formRef.reset();
    //change movieCard display to change back to original search display
    this.setState({giveMoodButtons: false});
    axios.get('/search', { params: { title: this.state.movie } })
      .then((response) => {
        this.setState({movies: response.data});
        this.setState({ showMovie: true });
      })
      .catch((err) => console.error(err));
  }

   //once you get the list of search results, clicking Rate This Movie makes Movies State set to the corresponding movie object wrapped as an array
   //this makes the mapping of movieCard easily return just this one movie
  handleMoodClick(movie) {
    this.setState({movies: [movie]});
    //change movieCard display to give option for tagging with moods
    this.setState({giveMoodButtons: true});
  }

  //hide the tag movie functionality after the user submits the movie
  hideTagging() {
    this.setState({giveMoodButtons: false, movies: []});
  }

   //calls for the users 4 most recently tagged movies
  getUserHistory(username) {
    let params = { username };
    axios.get('/users/history/', { params })
      .then((response) => {

        let history = response.data.reverse();
        if (history === null) history = [];
        this.setState({ history });
      })
      .catch(err => console.log('Error getting user history: ', err));
  }


  getUserRecs(username) {
    let params = { username };
    axios.get('/users/recs/', { params })
      .then((response) => {
        this.setState({ recs: response.data });
      })
      .catch(err => console.log('Error getting user history: ', err));
  }


  render() {
    //form will get onChange prop(function)
    //button will get onSubmit prop(funtion)
    return (
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">Welcome, {this.props.user}</p>
            </div>
          </div>
          {/* formRef resets input field after search */}
          <form ref={(ref) => this.formRef = ref} onSubmit={(event) => this.handleSearchClick(event)}>
            <div className="level-item" style={{ marginLeft: '70px' }} >
              <input
                className='input is-primary'
                placeholder='Tag a movie...'
                onChange={(event) => this.handleSearch(event)}
              />
              <button className="button is-primary"
                style={{ marginLeft: '10px' }}
                onClick={(event) => this.handleSearchClick(event)}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="columns is-fixed">
          <UserHistory user={this.props.user} getUserHistory={this.getUserHistory} history={this.state.history} />
          <div className="column is-one-fifth">
{/* ternary to alter the appearance of movieCards. Adds mood buttons after you click Add Moods */}
            {!this.state.giveMoodButtons ?

              // After Search + Selection Render this:
              <div className="container">
                <div className="columns is-multiline">
                  {this.state.movies.map((movie) => {
                    return (

                      <div className="column is-one-fourth">
                        <MovieCard movie={movie} />
                        <button className="button is-primary"
                          onClick={(event) => this.handleMoodClick(movie)}>Add Moods</button>

                      </div>
                    );
                  })}
                </div>
              </div>

              : <TagMovie movie={this.state.movies[0]} user={this.props.user} getUserHistory={this.getUserHistory} hideTagging={this.hideTagging} />}

          </div>
        </div>
      </div>
    );
  }

}
export default Profile_Search;
