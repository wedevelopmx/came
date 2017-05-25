import React, { Component } from 'react';

class ExitInsigth extends Component {
  render() {
    return (
      <div className="box-body b-t">
		  	<div className="streamline b-l m-b m-l">
              <div className="sl-item">
                <div className="sl-left">
                  <span className="w-40 circle green">
                    <i className="material-icons w-24">work </i>
	                </span>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Trabajo Temporal</a><span className="m-l-sm sl-date">Hoy</span>
                  <span className="pull-right text-muted m-l-xs"><i className="material-icons">chevron_right</i></span>
                  <div>Asignado por <a href="" className="text-info">Cristian Colorado</a>.</div>
                </div>
              </div>
              <div className="sl-item">
                <div className="sl-left">
                  <span className="w-40 circle blue">
                    <i className="material-icons w-24">shopping_basket</i>
	                </span>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Salida a la tienda</a><span className="m-l-sm sl-date">Viernes 2:40 pm - 3:00 pm</span>
                  <div>Retorno a tiempo</div>
                </div>
              </div>
              <div className="sl-item">
                <div className="sl-left">
                  <span className="w-40 circle blue">
                    <i className="material-icons w-24">local_hospital</i>
	                </span>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Salida a atencion medica</a><span className="m-l-sm sl-date">Sabado 10:30 am</span>
                  <div>Acompanado por <a href="" className="text-info">Dr. Rodriguez</a>.</div>
                </div>
              </div>
            </div>
            <a href="" className="btn btn-sm success text-u-c m-y-sm">Nueva Salida</a>
  		</div>
    );
  }
}

export default ExitInsigth;
