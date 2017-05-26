import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextareaField, SelectField, HiddenField, DatepickerField } from 'commons/form'
import { createCheckout } from '../actions';

class CheckoutForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const initData = {
      VisitorId: this.props.visitor.id,
      startDate: new Date()
    };

    this.props.initialize(initData);
  }

  onSubmit(values) {
    this.props.createCheckout(values, this.props.onComplete);
  }

  render() {
    const { handleSubmit } = this.props;
    const reasonList = [
      {value: 'Fue a la tienda', display: 'Fue a la tienda'},
      {value: 'Fue a trabajo', display: 'Fue a trabajo'},
      {value: 'Fue a subir al tren', display: 'Fue a subir al tren'},
      {value: 'Baja definitiva', display: 'Baja definitiva'}];

    return (
      <div className="box">
        <div className="box-header blue">
          <h3>Nueva salida</h3>
          <small>Ingrese los detalles sobre la salida.</small>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="box-body b-t">
            <Field label="Fecha:" name="startDate" component={ DatepickerField } />
            <Field label="Razon:" name="reason" options={ reasonList } component={ SelectField } />
            <Field label="Descripcion:" rows="2" name="comment" component={ TextareaField }/>
            <Field name="VisitorId"  component={ HiddenField }/>
          </div>
          <div className="dker p-a text-right">
            <button className="btn btn-sm white text-u-c m-r" onClick={ () => this.props.onComplete() }>Cancel</button>
            <button type="submit" className="btn btn-sm info text-u-c">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'

  if (!values.startDate) {
    errors.startDate = 'Campo fecha es necesario.';
  }

  if (!values.reason) {
    errors.reason = 'Campo razon es necesario.';
  }

  if (!values.comment) {
    errors.comment = 'Campo descripcion es necesario.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate,
  form: 'CheckoutForm'
})(
  connect(
    state => ({
      visitor: state.activeVisitor
    }), { createCheckout } )(CheckoutForm)
);
