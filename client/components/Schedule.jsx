import React from 'react';
import ReactDOM from 'react-dom';
import DateTime from 'react-datetime';
import moment from 'moment';
import axios from 'axios';




class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      existingUser: [],
      email: [],
      value: '',
      message: '',
      user: this.props.user,
      movie: this.props.movie,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleDateChange(event) {
    this.setState({
      date: event._d
    });
  }



  handleChange(event) {
    event.preventDefault();
    this.setState({[event.target.id]: event.target.value});
  }

  handleEmailClick() {
    axios.get('/checkUser', {
      params: {
        email: this.state.value
      }
    }).then((response) => {

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

  handleSubmit() {
    if (this.state.existingUser.length > 0) {
      axios.post('/sendEmailUser', {
        email: this.state.existingUser,
        time: moment(this.state.date).format('MMMM Do YYYY, h:mm:ss a'),
        message: this.state.message,
        user: this.state.user,
        movie: this.state.movie
      }).then((results) => {
        this.setState({
          message: ''
        });
      })
      .catch((err) => console.error(err));
    }
    if (this.state.email.length > 0) {
      axios.post('/sendEmailNew', {
        email: this.state.email,
        time: moment(this.state.date).format('MMMM Do YYYY, h:mm:ss a'),
        message: this.state.message,
        user: this.state.user,
        movie: this.state.movie
      }).then((results) => {
        this.setState({
          message: ''
        });
      })
      .catch((err) => console.error(err));
    }
    let emails = this.state.existingUser.concat(this.state.email);
    axios.post('/updateSchedule', {
      movie: this.state.movie,
      time: moment(this.state.date).format('MMMM Do YYYY, h:mm:ss a'),
      invitees: emails
    }).then((results) => {
      console.log(results);
    }).catch((err) => {
      console.error(err);
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
          <input type='email' id='value' value={this.state.value} onChange={this.handleChange}></input><button type="button" onClick={ () => this.handleEmailClick()}>+</button>
          <br></br>
          <h5>Write a message!</h5>
          <textarea id='message' value={this.state.message} onChange={this.handleChange} placeholder={`Want to watch ${this.props.movie.original_title} with me?`}></textarea>
          <br></br>
          <button type="button" onClick={()=> this.handleSubmit()}>Submit</button>
        </form>
      </div>
    );
  }
}
export default Schedule;
