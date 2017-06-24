import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputField } from 'commons/form'
import { Link } from 'react-router-dom';

class VisitorForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Nombre" name="firstName" component={ InputField } />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Alias" name="alias" component={ InputField } />
          </div>
        </div>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Apellido Paterno" name="lastName" component={ InputField } />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Apellido materno" name="secondSurename" component={ InputField } />
          </div>
        </div>
        { this.props.children }
      </form>
    );
  }
}

function validateVisitorForm(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.firstName) {
    errors.firstName = 'Campo nombre es necesario.';
  }
  // if (!values.alias) {
  //   errors.alias = 'Campo alias es necesario.';
  // }
  if (!values.lastName) {
    errors.lastName = 'Campo apellido paterno es necesario.';
  }
  // if (!values.secondSurename) {
  //   errors.secondSurename = 'Campo apellido materno es necesario.';
  // }
  return errors;
}

export default reduxForm({
  validate: validateVisitorForm,
  form: 'RegisterForm',
  destroyOnUnmount: false
})(VisitorForm);
