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
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
  }
  handleDateChange(event) {
    this.setState({
      date: event._d
    });
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleEmailClick() {
    axios.post('/checkEmail', {
      params: {
        email: this.state.value
      }
    })

  }




  render() {
    console.log(this.state.date);
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
          <input type='email' value={this.state.value}></input><button onClick={}>+</button>
        </form>
      </div>
    );
  }
}


ReactDOM.render(<Schedule />, document.getElementById('sched'));
