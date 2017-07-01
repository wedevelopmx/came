import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchVisitors } from '../../actions';
import { TextInput } from './form-controls'

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = { start: 0, end: 0 };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.pagination) {
      this.setState({
        start: nextProps.pagination.next.since - nextProps.pagination.next.size + 1,
        end: nextProps.pagination.next.since - nextProps.pagination.next.size + nextProps.displayedVisitors.size,
        next: nextProps.pagination.next.available,
        back: nextProps.pagination.back.available
      })
    }
  }

  back() {
    if(this.props.pagination.back.available)
      this.props.fetchVisitors(this.props.pagination.back);
  }

  next() {
    if(this.props.pagination.next.available)
      this.props.fetchVisitors(this.props.pagination.next);
  }

  render() {
    const nextClass = `btn btn-icon ${ this.state.next ? 'white': 'indigo'}`;
    const backClass = `btn btn-icon ${ this.state.back ? 'white': 'indigo'}`;
    return (
      <div className="btn-group pull-right">
        <a className={backClass}  onClick={ this.back.bind(this) } ><i className="material-icons">chevron_left</i></a>
        <span className="btn btn-icon-height white">{ this.state.start } - { this.state.end } de {this.props.displayedVisitors.total}</span>
        <a className={nextClass} onClick={ this.next.bind(this) }><i className="material-icons">chevron_right</i></a>
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
