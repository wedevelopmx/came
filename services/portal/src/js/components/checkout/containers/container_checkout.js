import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CheckoutItem } from 'checkout'
import { fetchCheckouts } from '../actions';
import { HourGlass } from 'commons/loaders';
import { convertToEvent } from 'commons/services';

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
    let events = _.orderBy(convertToEvent(this.props.checkouts), ['order'], ['desc']);

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
