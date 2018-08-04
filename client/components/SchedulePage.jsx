import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import ScheduleEntry from './ScheduleEntry.jsx';

class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      user: this.props.user,
    };
    this.getSchedule = this.getSchedule.bind(this);
  }

  componentDidMount() {
    this.getSchedule();

  }

  getSchedule() {
    axios.get('/getSchedule', {
      params: {
        user: this.props.user
      }
    }).then((results) => {

      this.setState({
        schedule: results.data,

      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    if (this.state.user === 'global') {
      return (
        <div>
          Please Login!
        </div>
      );
    } else {
      return (
        <div>
          <ScheduleEntry getSchedule = {this.getSchedule} user={this.state.user} schedule={this.state.schedule}/>
        </div>
      );
    }
  }
}

export default SchedulePage;
