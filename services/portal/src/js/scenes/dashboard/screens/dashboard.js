import React, { Component } from 'react';
import {VisitorList, AppointmentsList} from 'dashboard';

export default function() {
  let page = [];
  page.push(<h3 className="p-a-sm">Bienvenido! Esta es la informacion relevante para el dia  de hoy.</h3>);
  page.push(<div className="container-flex">
    <div className="col-sm-6">
      <VisitorList/>
    </div>
    <div className="col-sm-6">
      <AppointmentsList/>
    </div>
  </div>);
  return page;
}
