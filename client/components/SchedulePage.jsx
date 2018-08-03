import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import ScheduleEntry from './ScheduleEntry.jsx';

class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      // invitees: [],
      // confirmed: [],
      // cancelled: [],
      // movieTitle: '',
      // poster: '',
      // time: '',
      user: this.props.user
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
        // invitees: results.data[0].invitees,
        // movieTitle: results.data[0].movieTitle,
        // poster: results.data[0].poster,
        // time: results.data[0].time
      });
    }).catch((err) => {
      console.log(err);
    });
  }


  render() {
    // let invitees = this.state.invitees.map((invitee) => {
    //   return (
    //     <li>{invitee}</li>
    //   );
    // });
    if (this.state.user === 'global') {
      return (
        <div>
          Please Login!
        </div>
      );
    } else {
      return (
        <div>Sched Page
        <ScheduleEntry schedule={this.state.schedule}/>
          {/* <ul>
            {invitees}
          </ul>
          <p>{this.state.movieTitle}</p>
          <img src={this.state.poster}/>
          <p>{this.state.time}</p> */}
        </div>
      );
    }
  }
}


export default SchedulePage;
