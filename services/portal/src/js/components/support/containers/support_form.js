import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ActivityValidationField, CheckBoxField, TextareaField, SelectField, HiddenField, DatepickerField } from 'commons/form'
import { fetchServices } from 'service/actions'
import { createSupport } from '../actions';

class SupportForm extends Component {
  componentDidMount() {
    this.handleInitialize();
    this.props.fetchServices();
  }

  handleInitialize() {
    const initData = {
      VisitorId: this.props.visitor.id,
      startDate: new Date()
    };

    this.props.initialize(initData);
  }

  onSubmit(values) {
    this.props.createSupport(values, this.props.onComplete);
  }

  render() {
    const { handleSubmit } = this.props;
    const currentSupport = _.map(this.props.supports, support => {  return support.serviceId });
    const availableServicesList = _.omit(this.props.services, currentSupport);
    const serviceList = _.map(availableServicesList, service => { return { value: service.id, display: service.name } });

    if(serviceList.length == 0)
      return (
        <div className="box">
          <div className="box-header text-white orange">
            <h3>Nuevo Acompañamiento</h3>
            <small>Ingrese los detalles sobre el acompañamiento.</small>
          </div>
          <div className="box-body b-t text-center">
            <h5>No se puede agregar otro acompañamiento.</h5>
            <small>El visitante ya tiene registrados todas las opciones de acompañamiento disponibles.</small>
          </div>
          <div className="dker p-a text-right">
            <button className="btn btn-sm white text-u-c m-r" onClick={ () => this.props.onComplete()  }>Cancel</button>
          </div>
        </div>
      );

    return (
      <div className="box">
        <div className="box-header blue">
          <h3>Nuevo Acompañamiento</h3>
          <small>Ingrese los detalles sobre el acompañamiento.</small>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="box-body b-t">
            <div className="row">
              <div className="col-sm-12">
                  <Field label="Servicio" name="ServiceId" options={ serviceList } component={ SelectField } />
              </div>
              <div className="col-sm-12">
                <Field label="Inicio:" name="startDate" component={ DatepickerField } />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <ActivityValidationField label="Entrevista de Valoración:" checkbox="interview" textarea="interviewComment"/>
              </div>
              <div className="col-sm-12">
                <ActivityValidationField label="Entrevista Psicológica:" checkbox="psychological" textarea="psychologicalComment"/>
              </div>
            </div>
            <Field name="VisitorId"  component={ HiddenField }/>
          </div>
          <div className="dker p-a text-right">
            <button className="btn btn-sm white text-u-c m-r" onClick={ () => this.props.onComplete()  }>Cancel</button>
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
  if(!values.interview || values.interview == false) {
    errors.interview = 'Es necesario completar la entrevista de valoracion.';
  }

  if(!values.psychological || values.psychological == false) {
    errors.psychological = 'Es necesario completar la entrevista de valoracion psicologica.';
  }

  if (!values.startDate) {
    errors.startDate = 'Campo fecha de inicio es necesario.';
  }
  if (!values.ServiceId) {
    errors.ServiceId = 'Campo servicio es necesario.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate,
  form: 'SupportForm'
})(
  connect(
    state => ({
      supports: state.supports,
      services: state.services,
      visitor: state.activeVisitor
    }), { fetchServices, createSupport })(SupportForm)
);
