import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { HiddenField } from 'commons/form'
import WebCamera from '../../components/component_webcamera';

class PictureForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <WebCamera>
        </WebCamera>
        <div className="row">
          <div className="col-sm-12">
            <Field name="profilePic" component={ HiddenField }/>
          </div>
        </div>
        { this.props.children }
      </form>
    );
  }
}

function validatePictureForm(values) {
  const errors = {};

  if (!values.profilePic) {
    errors.profilePic = 'Es necesario tomar una foto del visitante.';
  }

  return errors;
}


export default reduxForm({
  validate: validatePictureForm,
  form: 'RegisterForm',
  destroyOnUnmount: false
})(PictureForm);
