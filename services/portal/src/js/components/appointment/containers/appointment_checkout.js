import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextareaField, InputField, HiddenField, DatepickerField } from 'commons/form'
import { updateAppointment } from '../actions';
import moment from 'moment';

class AppointmentCheckout extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    this.props.activeItem.startDate = this.props.activeItem.startDate ? new Date(this.props.activeItem.startDate) : new Date();
    this.props.activeItem.scheduleEndDate = this.props.activeItem.scheduleEndDate ? new Date(this.props.activeItem.scheduleEndDate) : new Date();
    this.props.activeItem.endDate = this.props.activeItem.endDate ? new Date(this.props.activeItem.endDate) : new Date();
    this.props.initialize(this.props.activeItem);
  }

  onSubmit(values) {
    this.props.updateAppointment(values, this.props.onComplete);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="box">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="box-header blue">
            <h3>Nueva salida</h3>
            <small>Ingrese los detalles sobre la salida.</small>
          </div>
          <div className="box-body b-t">

            <div className="row">
              <div className="col-sm-12 col-md-6">
                <Field label="Razon:" name="reason" disabled="true" component={ InputField } />
              </div>
              <div className="col-sm-12 col-md-6">
                <Field label="Salida:" name="startDate" disabled="true" component={ DatepickerField } />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 col-md-6">
                  <Field label="Programado:" name="scheduleEndDate" disabled="true" component={ DatepickerField } />
              </div>
              <div className="col-sm-12 col-md-6">
                <Field label="Regreso:" name="endDate" component={ DatepickerField } />
              </div>
            </div>

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

  if (!values.endDate) {
    errors.date = 'Campo fecha es necesario.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate,
  form: 'AppointmentCheckout'
})(
  connect(
    state => ({
      visitor: state.activeVisitor
    }), { updateAppointment } )(AppointmentCheckout)
);
