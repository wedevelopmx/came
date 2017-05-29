import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { SelectField } from 'commons/form'

class DemographicForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    const genderList = [{ value: 'male', display: 'Masculino'}, {value: 'female', display: 'Femenino'}, {value: 'transgender', display: 'Transgenero'}];
    const statusList = [{ value: 'migrante', display: 'Migrante' }, { value: 'visitante', display: 'Visitante' }];

    return (
      <form onSubmit={handleSubmit}>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Sexo" name="gender" options={ genderList } component={ SelectField } />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Status" name="status" options={ statusList } component={ SelectField } />
          </div>
        </div>
        { this.props.children }
      </form>
    );
  }
}

function validateDemographicForm(values) {
  const errors = {};

  if (!values.gender) {
    errors.gender = 'Campo sexo es necesario.';
  }
  if (!values.status) {
    errors.status = 'Campo status es necesario.';
  }

  return errors;
}


export default reduxForm({
  validate: validateDemographicForm,
  form: 'RegisterForm',
  destroyOnUnmount: false
})(DemographicForm);
