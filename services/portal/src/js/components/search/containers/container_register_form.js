import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createVisitor, fetchCategories, fetchCountries } from '../actions';
import { HiddenField, InputField, DatepickerField, SelectField } from 'commons/form'
import { WizardForm, Step } from 'commons/wizard';
import { VisitorForm, LocationForm, DemographicForm, PictureForm } from './register';

class RegisterForm extends Component {
  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchCountries();
  }

  onSubmit(values) {
    this.props.createVisitor(values, this.props.onComplete);
  }

  render() {
    return (
      <div className="box">
        <div className="box-header blue">
          <h3>Nuevo Visitante</h3>
          <small>Introduce los detalles sobre el visitante.</small>
        </div>
        <WizardForm onSubmit={this.onSubmit.bind(this)} onCancel={this.props.onComplete}>
          <VisitorForm label="Visitante"/>
          <LocationForm label="Ubicacion" />
          <DemographicForm label="Demograficos" />
          <PictureForm label="Fotografia"/>
        </WizardForm>
      </div>
    );
  }
}

export default connect(null, { fetchCategories, fetchCountries })(RegisterForm);
