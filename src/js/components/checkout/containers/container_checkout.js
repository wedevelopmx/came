import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CheckoutItem } from 'checkout'
import { fetchCheckouts } from '../actions';
import { HourGlass } from 'commons/loaders';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedItem: undefined };
  }

  componentDidMount() {
    moment.locale('es');
    this.props.fetchCheckouts(this.props.visitor.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visitor && nextProps.visitor.id !== this.props.visitor.id) {
      this.props.fetchCheckouts(nextProps.visitor.id);
    }
  }

  renderCheckouts() {
    let _self = this;

    return _.map(this.props.checkouts, checkout => {
      const className = `w-40 circle ${checkout.endDate ? 'blue' : 'red'}`;
      const icon = checkout.endDate? 'alarm_off': 'access_alarm';
      const time = checkout.endDate ?
        ( moment(new Date(checkout.startDate)).format('ddd, MMMM Do YYYY, h:mm a') + ' - ' + moment(new Date(checkout.endDate)).format('h:mm a')) :
        (moment(new Date(checkout.startDate)).fromNow());

      return (
        <div key={checkout.id} className="sl-item">
          <div className="sl-left">
            <span className={className} onClick={ () => _self.props.onUpdate(checkout) }>
              <i className="material-icons">{icon}</i>
            </span>
          </div>
          <div className="sl-content">
            <div className="sl-date text-muted">
              { time }
            </div>
            <a className="text-info">{ checkout.reason }</a>
            <div>{ checkout.comment }</div>
          </div>
        </div>
      );
    });
  }

  render() {
    if(Array.isArray(this.props.checkouts))
      return (<HourGlass></HourGlass>);

    if(Object.keys(this.props.checkouts).length == 0)
      return (
        <div className="p-a text-center">
          <h6>No existen elementos registrados.</h6>
          <a onClick={ () => this.props.onCreate() } className="md-raised md-mini md-btn md-fab m-b-sm btn-float btn-sm blue">
            <i className="material-icons md-24">add</i>
          </a>
        </div>
      );

    return (
      <div className="p-a">
        <div className="streamline b-l m-b m-l">
          { this.renderCheckouts() }
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
    visitor: state.activeVisitor,
    checkouts: state.checkouts
  };
}, { fetchCheckouts })(Checkout);
