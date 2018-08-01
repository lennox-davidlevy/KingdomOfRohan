import React from 'react';
import ReactDOM from 'react-dom';
import DateTime from 'react-datetime';
import axios from 'axios';




class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      existingUser: [],
      email: [],
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
  }
  handleDateChange(event) {
    this.setState({
      date: event._d
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value});
  }

  handleEmailClick() {
    axios.get('/checkUser', {
      params: {
        email: this.state.value
      }
    }).then((response) => {
      console.log('handleEmailClick:', response.data.exists);
      if (response.data.exists) {
        this.setState({
          existingUser: this.state.existingUser.concat(this.state.value)
        });
      } else {
        this.setState({
          email: this.state.email.concat(this.state.value)
        });
      }
    }).then(() => {
      this.setState({
        value: ''
      });
    }).catch((err) => {
      console.error('db error!', err);
    });
  }



  render() {
    return (
      <div>
        <form>
          <p>When do you want to watch?</p>
          <DateTime
            value={this.state.date}
            open={false}
            input={true}
            onBlur={this.handleDateChange}
          />
          <p>Do You Want To Invite Anyone?</p>
          <input type='text' value={this.state.value} onChange={this.handleChange}></input><button type="button" onClick={ () => this.handleEmailClick()}>+</button>
        </form>
      </div>
    );
  }
}

export default Schedule;
