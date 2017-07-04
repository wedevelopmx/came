import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextareaField, InputField, HiddenField } from 'commons/form'

class AssistanceForm extends Component {
  render() {
    return (
      <div className="box">
        <div className="box-header blue">
          <h3>Nuevo acompanamiento</h3>
          <small>Ingrese los detalles sobre el acompanamiento.</small>
        </div>
        <form>
          <div className="box-body b-t">
            <Field label="Descripcion:" rows="2" name="comment" component={ TextareaField }/>
            <Field label="Fecha:" name="date" component={ InputField } />
            <Field name="VisitorId"  component={ HiddenField }/>
          </div>
          <div className="dker p-a text-right">
            <button className="btn btn-sm white text-u-c m-r" onClick={ this.props.hide  }>Cancel</button>
            <button type="submit" className="btn btn-sm info text-u-c">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

//onSubmit={handleSubmit(this.onSubmit.bind(this))}
function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.description) {
    errors.description = 'Campo descripcion es necesario.';
  }
  if (!values.date) {
    errors.type = 'Campo fecha es necesario.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate,
  form: 'AssistanceForm'
})(
  connect(
    state => ({
      visitor: state.activeVisitor
    }), null )(AssistanceForm)
);
