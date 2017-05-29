import React, { Component } from 'react';
// import { createVisitor } from '../actions';
// import { WizardForm } from 'commons/wizard';
// import { VisitorForm, LocationForm, DemographicForm, PictureForm } from '../containers/register';

import RegisterForm from '../containers/container_register_form';

export default function() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <RegisterForm/>
        </div>
      </div>
    </div>
  );
}
