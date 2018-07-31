
import React from 'react';
import Tree_Lg_Movie from './Tree_Lg_Movie.jsx';
import Tree_Med_Movie from './Tree_Med_Movie.jsx';
import Tree_Sm_Movie from './Tree_Sm_Movie.jsx';
import './styles/TreeMode.css';

export default class TreeMode extends React.Component {
  constructor(props) {
    super(props)

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
