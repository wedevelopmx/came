import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createVisitor } from '../actions';
import DatepickerInput from '../components/datepicker_input';

class RegisterForm extends Component {
  renderField(field) {
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
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <DatepickerInput fieldInput={field.input} />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderOptions(options) {
    return options.map(function(option) {
      return <option key={option.value} value={ option.value }>{ option.display }</option>
    });
  }

  renderSelectField(field) {
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

  renderHidden(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <input
          type="hidden"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createVisitor(values, () => {
      console.log('VISITOR CREATED');
      //this.props.history.push('/');
      window.location='/#/';
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const genderList = [{ value: 'male', display: 'Masculino'}, {value: 'female', display: 'Femenino'}, {value: 'transgender', display: 'Transgenero'}];
    const statusList = [{ value: 'migrante', display: 'Migrante' }, { value: 'visitante', display: 'Visitante' }];

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="profilePic" component={this.renderHidden}/>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Nombre" name="firstName" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Alias" name="alias" component={this.renderField} />
          </div>
        </div>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Apellido Paterno" name="lastName" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Apellido materno" name="secondSurename" component={this.renderField} />
          </div>
        </div>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Pais" name="country" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Estado" name="state" component={this.renderField} />
          </div>
        </div>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Municipio" name="municipality" component={this.renderField} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="F. Nacimiento" name="birthdate" component={this.renderDatepickerField} />
          </div>
        </div>
        <div className="row m-b">
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
              <Link to="/" className="btn btn-fw white m-r">Cancel</Link>
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

  // Validate the inputs from 'values'
  if (!values.firstName) {
    errors.firstName = 'Campo nombre es necesario.';
  }
  if (!values.alias) {
    errors.alias = 'Campo alias es necesario.';
  }
  if (!values.lastName) {
    errors.lastName = 'Campo apellido paterno es necesario.';
  }
  if (!values.secondSurename) {
    errors.secondSurename = 'Campo apellido materno es necesario.';
  }
  if (!values.country) {
    errors.country = 'Campo pais es necesario.';
  }
  if (!values.state) {
    errors.state = 'Campo estado es necesario.';
  }
  if (!values.municipality) {
    errors.municipality = 'Campo municipio es necesario.';
  }
  // console.log(values.birthdate)
  // if (!values.birthdate) {
  //   errors.birthdate = 'Campo f.nacimiento es necesario.';
  // }
  if (!values.gender) {
    errors.gender = 'Campo sexo es necesario.';
  }
  if (!values.status) {
    errors.status = 'Campo status es necesario.';
  }
  if(!values.profilePic) {
    errors.profilePic = 'Necesita foto del visitante.';
  }
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'RegisterForm'
})(
  connect(null, { createVisitor })(RegisterForm)
);
