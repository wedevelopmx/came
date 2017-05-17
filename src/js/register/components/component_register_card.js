import React, { Component } from 'react';
import WebCamera from './component_webcamera';
import RegisterForm from './component_register_form';

class RegisterCard extends Component {
  render() {
    return (
      <div className="box" ng-show="showForm">
        <WebCamera/>
        <div className="box-body padding">
          <RegisterForm/>
        </div>
      </div>
    );
  }
}

export default RegisterCard;
