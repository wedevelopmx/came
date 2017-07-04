import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchVisitors } from '../../actions';
import { TextInput, SelectField } from './form-controls'

class AdvancedSearchBar extends Component {
  submit(values) {
    this.props.fetchVisitors(values);
  }

  render() {
    const { handleSubmit } = this.props;
    const genderList = [{ value: '', display: 'Todas' }, { value: 'male', display: 'Hombre' }, { value: 'female', display: 'Mujer' }, { value: 'trans', display: 'Transgenero' }];
    const statusList = [{ value: '', display: 'Todas' }, { value: 'Migrante', display: 'Migrante' }, { value: 'Visitante', display: 'Visitante' }];
    const checkoutList = [{ value: '', display: 'Todas' }, { value: 'Tren', display: 'Tren' }, { value: 'Permanente', display: 'Permanente' }];

    return (
      <form className="search-bar" onSubmit={ handleSubmit(this.submit.bind(this)) } >
        <div className="form-group l-h m-a-0">
          <div className="input-group input-group-sm">
            <Field name="term" component={ TextInput } placeholder="Buscar visitante..."/>
            <span className="input-group-btn">
              <button type="submit" className="btn white b-a rounded no-shadow">
                <i className="material-icons">search</i>
              </button>
              <a onClick={ this.props.onSimple } className="btn danger b-a rounded no-shadow">
                <i className="material-icons">filter_list</i>
              </a>
            </span>
          </div>
        </div>
        <div className="container p-t white">
          <Field label="Sexo" name="gender" options={genderList} component={ SelectField } />
          <Field label="Tipo" name="status" options={statusList} component={ SelectField } />
          <Field label="Salida" name="checkout" options={checkoutList} component={ SelectField } />
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  return errors;
}


export default reduxForm({
  validate: validate,
  form: 'AdvancedSearchBar'
})(connect((state) => {
  return {
    genders: state.genders,
    status: state.status
  };
}, { fetchVisitors })(AdvancedSearchBar));
