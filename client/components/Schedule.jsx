import React from 'react';
import DateTime from 'react-datetime';



class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emails: []
    };
  }

  render() {
    return (
      <div>
        <DateTime />
      </div>
    );
  }
}

export default Schedule;
