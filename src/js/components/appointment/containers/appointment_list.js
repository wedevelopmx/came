import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HourGlass } from 'commons/loaders';
import { fetchAppointments } from '../actions';
import { convertToEvent } from 'commons/services';

class AppointmentList extends Component {
  componentDidMount() {
    this.props.fetchAppointments(this.props.parent.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.parent && nextProps.parent.id !== this.props.parent.id) {
      this.props.fetchAppointments(nextProps.parent.id);
    }
  }

  renderAppointments() {
    const _self = this;
    let events = _.orderBy(convertToEvent(this.props.appointments), ['order'], ['desc']);

    return _.map(events, (event) => {
      const className = `w-40 circle ${event.icon.color}`;
      return (
        <div key={event.reference.id} className="sl-item">
          <div className="sl-left">
            <span className={className} onClick={ () => _self.props.onUpdate(event.reference) }>
              <i className="material-icons">{ event.icon.material }</i>
            </span>
          </div>
          <div className="sl-content">
            <div className="sl-date text-muted">
              { event.time }
            </div>
            <a className="text-info">{ event.reference.reason }</a>
            <div>{ event.reference.comment }</div>
          </div>
        </div>
      );
    });
  }

  render() {
    if(Array.isArray(this.props.appointments))
      return (<HourGlass></HourGlass>);

    if(Object.keys(this.props.appointments).length == 0) {
      return (<h4 className="text-center">No existen citas registradas.</h4>);
    }

    return (
      <div className="p-a">
        <div className="streamline b-l m-b m-l">
          { this.renderAppointments() }
        </div>
        <a onClick={ () => this.props.onCreate() } className="md-raised md-mini md-btn md-fab m-b-sm btn-float btn-sm blue">
          <i className="material-icons md-24">add</i>
        </a>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    appointments: state.appointments
  };
}, { fetchAppointments })(AppointmentList);
