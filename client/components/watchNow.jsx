import React from 'react';
import axios from 'axios';
class watchNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itunesData: null
    };
  }

  componentDidMount(){
    axios.get('/price', {
      params: {
        term: "toy story 3"
      }
    })
    .then(results => console.log(results));
  }

  render() {
    return (
      <div>
        HELLO
      </div>
    );
  }
}

export default watchNow;
