import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchVisitors } from '../../actions';
import { TextInput } from './form-controls'

class Pagination extends Component {
  back() {
    this.props.fetchVisitors(this.props.pagination.back);
  }

  next() {
    this.props.fetchVisitors(this.props.pagination.next);
  }

  render() {
    return (
      <div className="btn-group pull-right">
        <a className="btn btn-icon white" onClick={ this.back.bind(this) } ><i className="material-icons">chevron_left</i></a>
        <span className="btn btn-icon-height white">{this.props.displayedVisitors.size} de {this.props.displayedVisitors.total}</span>
        <a className="btn btn-icon white" onClick={ this.next.bind(this) }><i className="material-icons">chevron_right</i></a>
      </div>
    );
  }
}

function validate(values) {
  return {};
}

export default reduxForm({
  validate: validate,
  form: 'Pagination'
})(connect((state) => {
  return {
    pagination: state.pagination,
    displayedVisitors: state.displayedVisitors
  };
}, { fetchVisitors })(Pagination));
