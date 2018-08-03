import React from 'react';

const ScheduleEntry = (props) => {
  console.log('scheduleEntry props:', props.schedule);
  let entries = props.schedule.map((item) => {
    return (
      <div className="schedule-box">
        <div className="invitees-box">
          <ul>
            {item.invitees.map((user) => {
              return (
                <li>{user}</li>
              );
            })}
          </ul>
        </div>
        <p>{item.movieTitle}</p>
        <img className="movie-poster" src={item.poster}/>
        <p>{item.time}</p>
      </div>
    );
  });



  return (

    <div>{entries}</div>

  );

};

export default ScheduleEntry;
