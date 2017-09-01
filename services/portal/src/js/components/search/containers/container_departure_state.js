import React, { Component } from 'react';

// <DepartureState departure={visitor.departure}/>
const DepartureState = function(props) {
  const { state, scheduleEndDate, endDate } = props.departure;
  let statusColor = "pull-right ";

  // If visitor has not exit and should go out within next 24 hours
  if(!endDate && Date.parse(scheduleEndDate) > Date.now() && Date.parse(scheduleEndDate) - Date.now() < 86400000) {
    statusColor += " text-warn";
  } else if(!endDate && Date.now() > Date.parse(scheduleEndDate)) {
    statusColor += " text-warning";
  } else {
    switch (state) {
      case "expulsado":
        statusColor += "text-danger";
        break;
      case "hospedado":
        statusColor += "text-success";
        break;
      default: // baja definitiva | por tren
        statusColor += "text-blue";
    }
  }

  return (
    <span className={`${statusColor}`}><i className="material-icons m-r-xs">brightness_1 </i></span>
  );
}

export default DepartureState;
