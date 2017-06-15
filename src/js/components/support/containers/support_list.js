import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchSupports } from '../actions';
import { HourGlass } from 'commons/loaders';

class SupportList extends Component {
  componentDidMount() {
    moment.locale('es');
    this.props.fetchSupports(this.props.visitor.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visitor && nextProps.visitor.id !== this.props.visitor.id) {
      this.props.fetchSupports(nextProps.visitor.id);
    }
  }

  renderSupports() {
    let _self = this;

    return _.map(this.props.supports, service => {
      const className = `w-40 circle green`;
      return (
        <div key={service.id} className="sl-item">
          <div className="sl-left">
            <span className="w-40 circle green" onClick={ () => _self.props.onUpdate(service) }>
              <i className="material-icons w-24">{ service.resource }</i>
            </span>
          </div>
          <div className="sl-content">
            <a href="" className="text-info">{ service.name }</a><span className="m-l-sm sl-date"></span>
            <div>{ moment(new Date(service.startDate)).format('ddd, MMMM Do YYYY, h:mm a') }.</div>
          </div>
        </div>
      );
    });
  }

  render() {
    if(Array.isArray(this.props.supports))
      return (<HourGlass></HourGlass>);

    if(Object.keys(this.props.supports).length == 0)
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
        <div className="streamline b-l m-l">
          { this.renderSupports() }
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
    supports: state.supports
  };
}, { fetchSupports })(SupportList);
