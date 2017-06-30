import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchVisitors } from '../../actions';
import { TextInput } from './form-controls'

class SimpleSearchBar extends Component {
  submit(values) {
    this.props.fetchVisitors(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="search-bar" onSubmit={ handleSubmit(this.submit.bind(this)) }>
        <div className="form-group l-h m-a-0">
          <div className="input-group input-group-sm">
            <Field name="term" component={ TextInput } placeholder="Buscar visitante..."/>
            <span className="input-group-btn">
              <button type="submit" className="btn white b-a rounded no-shadow">
                <i className="material-icons">search</i>
              </button>
              <a onClick={ this.props.onAdvanced } className="btn white b-a rounded no-shadow">
                <i className="material-icons">filter_list</i>
              </a>
            </span>
          </div>
        </div>
      </form>
    );
  }
}

function validate(values) {
  return {};
}

export default reduxForm({
  validate: validate,
  form: 'SimpleSearchBar'
})(connect((state) => { return {}; }, { fetchVisitors })(SimpleSearchBar));
