
import React from 'react';
import axios from 'axios';
import Tree_Lg_Movie from './Tree_Lg_Movie.jsx';
import Tree_Med_Movie from './Tree_Med_Movie.jsx';
import Tree_Sm_Movie from './Tree_Sm_Movie.jsx';
import {generateFreshTreeContent} from './helpers/manageTreeArrays.js';

import {regenerateTreeContent} from './helpers/manageTreeArrays.js';
import './styles/TreeMode.css';

export default class TreeMode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      treeItemSelected: '',
      currentMood: null,
      currentMovie: '',
      treeContents: {},
      csvData: {}
      
    }
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.getCSV_Data = this.getCSV_Data.bind(this);
  }

  getCSV_Data(mood) {
    console.log('component:MOOD:', mood)
    axios.get(`/csv/?mood=${mood}`)
      .then(response => {
        console.log('response.data',response.data);
        this.setState=({ csvData: response.data })
      })
      .catch(err => console.error(err));
  }

  handleMoodChange() {
    this.setState({ currentMood: this.props.moods[0] });
  }

  componentDidUpdate(nextProps, nextState){
    if (this.props.currentMovie !== '[]') {
      this.getCSV_Data(this.props.moods[0]);
      //let tree = generateFreshTreeContent(this.props.moods[0], this.props.currentMovie);
    }
  }


  componentWillReceiveProps(){
    this.setState({ currentMood: this.props.moods[0] });
    this.setState({ currentMovie: this.props.currentMovie });
    
  }

  render() {
    return (
      <div className="tree_wrapper">

        <div className="backButton">
          <button className="prevSelection">
          {"<-"}
          </button>
        </div>

        <div id="Main">
          <Tree_Lg_Movie />
        </div>

        <div id="Sub">
          <Tree_Med_Movie />
          <Tree_Med_Movie />
        </div>

        <div id="SubSub">
          <div className="sm_flex_wrapper">
            <Tree_Sm_Movie />
            <Tree_Sm_Movie />
            <Tree_Sm_Movie />
          </div>
          <div className="sm_flex_wrapper">
            <Tree_Sm_Movie />
            <Tree_Sm_Movie />
            <Tree_Sm_Movie />
          </div>
          <div className="sm_flex_wrapper">
            <Tree_Sm_Movie />
            <Tree_Sm_Movie />
            <Tree_Sm_Movie />
          </div>
          <div className="sm_flex_wrapper">
            <Tree_Sm_Movie />
            <Tree_Sm_Movie />
            <Tree_Sm_Movie />
          </div>
        </div>

      </div>
    )
  }
}
