import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CheckoutItem } from 'checkout'
import { fetchCheckouts } from '../actions';

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
    if(this.props.checkouts == null)
      return (<div>Loading...</div>);

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

  // <span onClick={ () => _self.props.onUpdate(checkout) } className="pull-right text-muted m-l-xs"><i className="material-icons">chevron_right</i></span>
  // <div className="box-tool">
  //   <ul className="nav">
  //     <li className="nav-item inline">
  //       <a className="nav-link" onClick={ () => _self.props.onUpdate(checkout) }>
  //         <i className="material-icons md-18">alarm_off</i>
  //       </a>
  //     </li>
  //   </ul>
  // </div>

  render() {
    return (
      <div className="box">
        <div className="box-body">
          <div className="streamline b-l m-b m-l">
            { this.renderCheckouts() }
          </div>
        </div>
        <div className="box-footer">
          <a onClick={ () => this.props.onCreate() } className="btn btn-sm btn-block info text-u-c">Nuevo</a>
        </div>
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
