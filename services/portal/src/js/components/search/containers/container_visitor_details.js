import React, { Component } from 'react';
import moment from 'moment';

export default function(props) {
  const { visitor, onClose } = props;
  return (
    <div className="box box-lg">
      <div className="box-tool">
        <ul className="nav">
          <li className="nav-item inline">
            <a className="nav-link" onClick={onClose}>
              <i className="material-icons md-18">close</i>
            </a>
          </li>
        </ul>
      </div>
      <div className="p-a-md">
        <p className="frame fm-xl m-b-md">
          <img src={ '/api/visitor/' + visitor.avatar + '/avatar' } className="picture fit"/>
        </p>
        <span className="text-md block">
          { `${visitor.firstName} ${visitor.lastName}` }
        </span>
        <small className="text-sm text-muted block">
          <i className="material-icons m-r-xs">event</i> { moment(new Date(visitor.birthdate)).fromNow(true) } &nbsp;
            | <i className="material-icons m-r-xs">room</i> { `${visitor.state}, ${visitor.country}` } &nbsp;
            | <i className="material-icons m-r-xs">airline_seat_individual_suite</i> { moment(new Date(visitor.departure.startDate)).fromNow(true) }
          </small>
      </div>
    </div>
  );
}
