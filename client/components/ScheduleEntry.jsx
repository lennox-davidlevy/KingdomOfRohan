import React from 'react';
import axios from 'axios';

class ScheduleEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      user: this.props.user,
      userDeclined: false,
      userAccepted: false,
    };
    this.onAcceptClick = this.onAcceptClick.bind(this);
    this.onDeclineClick = this.onDeclineClick.bind(this);
    this.onDeleteCancelled = this.onDeleteCancelled.bind(this);
    this.onDeleteAccepted = this.onDeleteAccepted.bind(this);

  }



  onAcceptClick(id) {
    axios.post('/acceptSched', {
      id: id,
      user: this.state.user
    }).then(()=> {
      this.props.getSchedule()
      this.setState({
        userAccepted: true,
        userDeclined: false
      });
    });
  }


  onDeclineClick(id) {
    axios.post('/declineSched', {
      id: id,
      user: this.state.user
    }).then(()=> {
      this.props.getSchedule()
      this.setState({
        userAccepted: false,
        userDeclined: true
      });
    });
  }

  onDeleteCancelled(id) {
    axios.post('/deleteCancelled', {
      id: id,
      user: this.state.user
    })
  }
  onDeleteAccepted(id) {
    axios.post('/deleteAccepted', {
      id: id,
      user: this.state.user
    })
  }




  render() {
    console.log('schedfromdb:', this.props.schedule)
    let entries = this.props.schedule.map((item) => {
      return (
        <div className="schedule-box">
          <div className="invitees-box">
            <ul id="invitee-ul">
              {item.invitees.map((user) => {
                return (
                  <li id="invitee-li">{user}</li>
                );
              })}
            </ul>
          </div>
          <div className="accepted-box">
            <ul id="accepted-ul">
              Accepted!
              {item.accepted.map((user) => {
                return (
                  <li id="accepted-li">{user}</li>
                );
              })}
            </ul>
          </div>
          <div className="cancelled-box">
            <ul id="cancelled-ul">
              Declined!
              {item.cancelled.map((user) => {
                return (
                  <li id="cancelled-li">{user}</li>
                );
              })}
            </ul>
          </div>
          <h1 id="movie-title">{item.movieTitle}</h1>
          <h1 id="movie-time">{item.time}</h1>
          <img className="movie-poster" src={item.poster}/>
          <a disabled={this.state.userAccepted} class="button is-primary" onClick={() => { this.onAcceptClick(item._id); this.onDeleteCancelled(item._id)}}>Accept</a>
          <a disabled={this.state.userDeclined} class="button is-primary" onClick={() => { this.onDeclineClick(item._id); this.onDeleteAccepted(item._id)}}>Decline</a>
          <a class="button is-primary" onClick={() => { this.onDeleteCancelled(item._id); this.onDeleteAccepted(item._id); this.props.getSchedule()}}>Not Sure</a>


        </div>
      );
    });
    return (
      <div>{entries}</div>
    );
  }
}

export default ScheduleEntry;
