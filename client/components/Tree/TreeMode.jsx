
import React from 'react';
import axios from 'axios';

import generateFirstTreeContent from './helpers/generateFirstTreeContent.js';
import reshuffleTree from './helpers/reshuffleTree.js';
import restorePrevContents from './helpers/restorePrevContents.js';
import './styles/TreeMode.css';

export default class TreeMode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      treeItemSelected: '',
      currentMood: null,
      treeContents: {},

      moodData: {},
      isContent: false


    }
    this.clickedReshuffle = this.clickedReshuffle.bind(this);
    this.clickedBackButton = this.clickedBackButton.bind(this);
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.getCSV_Data = this.getCSV_Data.bind(this);
  }

  clickedBackButton(e) {
    e.preventDefault();
    if (this.state.treeContents.previousTree) {
      if (this.state.treeContents.previousTree.length > 0) {
        let newTree = restorePrevContents(this.state.treeContents);
        this.setState({treeContents: newTree});
      }
    }
  }

  clickedReshuffle(e) {
    e.preventDefault();
    let newTree = reshuffleTree(this.state.treeContents);
    this.setState({treeContents: newTree});
  }

  getCSV_Data(mood) {


    axios.get(`/csv/?mood=${mood}`)
      .then(response => {
        this.setState({ moodData: response.data });

        generateFirstTreeContent(
          this.state.moodData
          , this.state.treeContents
          , (tree) => {

            this.setState({treeContents: tree});
            this.setState(prevState => ({
              isContent: !prevState.isContent
            }));
          }
        )

      })
      .catch(err => console.error(err));
  }

  handleMoodChange() {
    this.setState({ currentMood: this.props.moods[this.props.moods.length - 1] });
  }



  componentWillMount(){
    this.setState({ currentMood: this.props.moods[this.props.moods.length - 1] });
    this.getCSV_Data(this.props.moods[this.props.moods.length - 1]);

  }

  render() {
    return (
      this.state.isContent
      ? (
        <div className="main">
          <div className="header">
            <button
              className="back"
              onClick={this.clickedBackButton}
            >previous</button>
            <div className="playCtr">Plays</div>
            <div className="bookCtr">Books</div>
            <div className="mood">{this.state.currentMood}</div>
            <div className="movieCtr">Movies</div>
            <div className="songCtr">Songs</div>
            <button
              className="reshuffle"
              onClick={this.clickedReshuffle}
            >reshuffle</button>
          </div>

          <div className="media">
            {
              this.state.treeContents.currentData.map( (each, index) => {
                return (
                  <div key={index} className={each.type}>
                    <p>{each.title}</p>
                    <p>{each.author}</p>
                </div>
                )
              })
            }
          </div>
        </div>
      ) : ''
    )
  }
}
