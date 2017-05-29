import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputField } from 'commons/form'

class LocationForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Pais" name="country" component={ InputField } />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Estado" name="state" component={ InputField } />
          </div>
        </div>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Municipio" name="municipality" component={ InputField } />
          </div>
          <div className="col-sm-12 col-md-6">

          </div>
        </div>
        { this.props.children }
      </form>
    );
  }
}

function validateLocationForm(values) {
  const errors = {};

  if (!values.country) {
    errors.country = 'Campo pais es necesario.';
  }
  if (!values.state) {
    errors.state = 'Campo estado es necesario.';
  }
  if (!values.municipality) {
    errors.municipality = 'Campo municipio es necesario.';
  }
  return errors;
}


export default reduxForm({
  validate: validateLocationForm,
  form: 'RegisterForm',
  destroyOnUnmount: false
})(LocationForm);
