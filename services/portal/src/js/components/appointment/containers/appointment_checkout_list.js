import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppointmentsByVisitorId } from '../actions';
import { HourGlass } from 'commons/loaders';
import { convertToEvent } from 'commons/services';

class AppointmentCheckoutList extends Component {
  componentDidMount() {
    this.props.fetchAppointmentsByVisitorId(this.props.visitor.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visitor && nextProps.visitor.id !== this.props.visitor.id) {
      this.props.fetchAppointmentsByVisitorId(nextProps.visitor.id);
    }
  }

  renderCheckouts() {
    let _self = this;
    let events = _.orderBy(convertToEvent(this.props.appointments), ['order'], ['desc']);

    return _.map(events, event => {
      const className = `w-40 circle ${event.icon.color}`;

      return (
        <div key={event.reference.id} className="sl-item">
          <div className="sl-left">
            <span className={className} onClick={ () => _self.props.onUpdate(event.reference) }>
              <i className="material-icons">{event.icon.material}</i>
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

    if(Object.keys(this.props.appointments).length == 0)
      return (
        <div className="p-a text-center">
          <h6>No existen elementos registrados.</h6>
        </div>
      );

    return (
      <div className="p-a">
        <div className="streamline b-l m-b m-l">
          { this.renderCheckouts() }
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    visitor: state.activeVisitor,
    appointments: state.appointments
  };
}, { fetchAppointmentsByVisitorId })(AppointmentCheckoutList);
