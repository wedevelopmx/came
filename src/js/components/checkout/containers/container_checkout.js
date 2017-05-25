import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchCheckouts } from '../actions';

class Checkout extends Component {
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

    return _.map(this.props.checkouts, checkout => {
      const className = `w-40 circle ${checkout.endDate ? 'blue' : 'red'}`;
      const icon = checkout.endDate? 'alarm_off': 'access_alarm';
      const time = checkout.endDate ?
        ( moment(new Date(checkout.startDate)).format('ddd, MMMM Do YYYY, h:mm a') + ' - ' + moment(new Date(checkout.endDate)).format('h:mm a')) :
        (moment(new Date(checkout.startDate)).startOf('hour').fromNow());

      return (
        <div key={checkout.id} className="sl-item">
          <div className="sl-left">
            <span className={className}>
              <i className="material-icons">{icon}</i>
            </span>
          </div>
          <div className="sl-content">
            <div className="sl-date text-muted">
              { time }
            </div>
            <a className="text-info">{ checkout.reason }</a>
            <span className="pull-right text-muted m-l-xs"><i className="material-icons">chevron_right</i></span>
            <div>{ checkout.comment }</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="box">
        <div className="box-header">
          <h3>Who to follow</h3>
        </div>
        <div className="box-divider m-a-0"></div>
        <div className="box-body">
          <div className="streamline b-l m-b m-l">
            { this.renderCheckouts() }
          </div>
        </div>
        <div className="box-footer">
          <a onClick={ this.props.hide } className="btn btn-sm btn-block info text-u-c">Nuevo</a>
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


// <div className="sl-item">
//   <div className="sl-left">
//     <span className="w-40 circle green">
//       <i className="material-icons w-24">work </i>
//     </span>
//   </div>
//   <div className="sl-content">
//     <a href="" className="text-info">Trabajo Temporal</a><span className="m-l-sm sl-date">Hoy</span>
//     <span className="pull-right text-muted m-l-xs"><i className="material-icons">chevron_right</i></span>
//     <div>Asignado por <a href="" className="text-info">Cristian Colorado</a>.</div>
//   </div>
// </div>
// <div className="sl-item">
//   <div className="sl-left">
//     <span className="w-40 circle blue">
//       <i className="material-icons w-24">shopping_basket</i>
//     </span>
//   </div>
//   <div className="sl-content">
//     <a href="" className="text-info">Salida a la tienda</a><span className="m-l-sm sl-date">Viernes 2:40 pm - 3:00 pm</span>
//     <div>Retorno a tiempo</div>
//   </div>
// </div>
// <div className="sl-item">
//   <div className="sl-left">
//     <span className="w-40 circle blue">
//       <i className="material-icons w-24">local_hospital</i>
//     </span>
//   </div>
//   <div className="sl-content">
//     <a href="" className="text-info">Salida a atencion medica</a><span className="m-l-sm sl-date">Sabado 10:30 am</span>
//     <div>Acompanado por <a href="" className="text-info">Dr. Rodriguez</a>.</div>
//   </div>
// </div>
