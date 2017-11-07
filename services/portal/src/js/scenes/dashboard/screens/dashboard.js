import React, { Component } from 'react';
import {VisitorList, AppointmentsList} from 'dashboard';

export default function() {
  return (
    <div className="container-flex">
      <div>
      <h3 className="p-a-sm">Bienvenido! Esta es la informacion relevante para el dia  de hoy.</h3>
      <div className="col-sm-6">
        <VisitorList/>
      </div>
      <div className="col-sm-6">
        <AppointmentsList/>
      </div>
      </div>
    </div>
  );
}
