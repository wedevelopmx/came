import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DatepickerInput from './datepicker_input';

class RegisterForm extends Component {
  renderField(field) {
    console.log(field);
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderDatepickerField(field) {
    console.log(field);
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <DatepickerInput {...field.input} />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  // <input
  //   className="form-control"
  //   type="text"
  //   placeholder="yyyy-MM-dd" data-date-format="yyyy-MM-dd" data-min-date="01/01/1917" data-max-date="today" data-autoclose="1" bs-datepicker
  //   {...field.input}
  // />

  renderOptions(options) {
    return options.map(function(option) {
      return <option key={option.value} value={ option.value }>{ option.display }</option>
    });
  }

  renderSelectField(field) {
    console.log(field);
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <select
          className="form-control"
          {...field.input}>
          { this.renderOptions(field.options) }
        </select>
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  render() {
    const genderList = [{ value: 'male', display: 'Masculino'}, {value: 'female', display: 'Femenino'}];
    const statusList = [{ value: 'migrante', display: 'Migrante' }, { value: 'visitante', display: 'Visitante' }];

    return (
      <form>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Nombre" name="name" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Alias" name="alias" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Apellido Paterno" name="lastName" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Apellido materno" name="secondSurename" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Pais" name="country" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Estado" name="state" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Municipio" name="municipality" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="F. Nacimiento" name="birthdate" component={this.renderDatepickerField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Sexo" name="gender" options={ genderList } component={this.renderSelectField.bind(this)} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Status" name="status" options={ statusList } component={this.renderSelectField.bind(this)} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12">
            <div className="pull-right">
              <button type="button" className="btn btn-fw white m-r">Cancel</button>
              <button type="submit"  className="btn btn-fw info">Submit</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};



  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'RegisterForm'
})(
  connect(null, null)(RegisterForm)
);
