import React from 'react';

const ScheduleEntry = (props) => {

  let entries = props.schedule.map((item) => {
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
        <h1 id="movie-title">{item.movieTitle}</h1>
        <img className="movie-poster" src={item.poster}/>
        <h1 id="movie-time">{item.time}</h1>
      </div>
    );
  });
  
  return (
    <div>{entries}</div>
  );
};

export default ScheduleEntry;
