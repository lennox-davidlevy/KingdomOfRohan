import React from 'react';
import axios from 'axios';

class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      movieTitle: '',
      poster: '',
      time: '',
    };

  }

  componentDidMount() {
    axios.get('/getSchedule')
  }

  render() {
    return (
      <div></div>

    );
  }
}

export default SchedulePage;
