import React from 'react';
import axios from 'axios';
import Results from './Results.jsx';
<<<<<<< HEAD
import TreeMode from './Tree/TreeMode.jsx';
=======
import Schedule from './Schedule.jsx';
>>>>>>> c576d2b8a44bdafbccf31ae3c04286090d944b6b

class GlobalSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dbMoods: ['whimsical', 'intense', 'thriller', 'heartfelt', 'gripping', 'boring', 'thoughtProvoking', 'uplifting', 'light', 'tearJerker', 'challenging', 'mindScrew', 'nostalgic', 'powerful', 'despair', 'exhausting', 'paranoid', 'motivated', 'uncomfortable'],
      moods: [],
      selected: 'whimsical',
      movies: [],
      user: this.props.user
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  //event handler for the addition of each mood to the global search
  handleChange(e) {
    // console.log('you selected ', e.target.value);
    let temp = this.state.moods;
    if (temp.length < 3 && !temp.includes(this.state.selected)) {
      temp.push(e.target.value);
    }
    this.setState({ moods: temp });

    //dynamically query the database based on each mood added
    this.handleSearch();

  }

  //function that takes the chosen moods in the global search,
  //sends then to the server and then queries the database for matching movies
  handleSearch() {
    //create the search params by transfroming them into a string with spaces
    let params = { moods: this.state.moods.join(' ') };

    //send moods array to server and eventually query DB
    axios.get('/results/', { params })
      .then((response) => {
        this.setState({movies: response.data});
      })
      .catch((err) => console.error(err));
  }

  //event handler for when a user removes a mood from their current search
  handleDelete(e) {
    let index = e.target.value;
    let temp = this.state.moods;
    temp.splice(index, 1);
    this.setState({ moods: temp });

    //dynamically query with the new combination of moods
    this.handleSearch();
  }

  render() {
    console.log('global search user props:', this.props.user);
    return (
      <div className="section">
        <div className="title is-title-4">Find a Moodvie to watch</div>
        <div className="field">
          <div className="control">
            <div className="select is-primary">
              <select
                onChange={this.handleChange} className="select is-multiple">
                {this.state.dbMoods.map((option, index) => {
                  return <option value={option} key={index}>{option}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="container" style={{ margin: '15px' }} >

          { this.state.moods.length > 0 ?
            <span className="subtitle">Our users found these movies to be </span> : null
          }

          {this.state.moods.map((mood, index) =>
            <span className="tag is-primary is-large" style={{ margin: '7px' }}>{mood}
              <button onClick={this.handleDelete} value={index} className="delete"></button>
            </span>)}
        </div>

        <div className="container">
          {
            this.state.moods.length === 0 
              ? <div></div> 
              : ( <div>
                    <Results movies={this.state.movies} />
                    <TreeMode mood={this.state.moods}/>
                  </div>
                )
          }
        </div>

      </div>
    );
  }
}

export default GlobalSearch;
