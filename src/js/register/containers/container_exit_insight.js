import React, { Component } from 'react';

class ExitInsigth extends Component {
  render() {
    return (
      <div className="box-body b-t">
		  	<div className="streamline b-l m-b m-l">
              <div className="sl-item">
                <div className="sl-left">
                  <img src="./images/profile.png" className="img-circle"/>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Trabajo Temporal</a><span className="m-l-sm sl-date">hace 40 min</span>
                  <div>Asignado por <a href="" className="text-info">Cristian Colorado</a>.</div>
                </div>
              </div>
              <div className="sl-item">
                <div className="sl-left">
                  <img src="./images/profile.png" className="img-circle"/>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Salida a la tienda</a><span className="m-l-sm sl-date">Viernes 2:40 pm - 3:00 pm</span>
                  <div>Retorno a tiempo</div>
                </div>
              </div>
              <div className="sl-item">
                <div className="sl-left">
                  <img src="./images/profile.png" className="img-circle"/>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Salida a atencion medica</a><span className="m-l-sm sl-date">Sabado 10:30 am</span>
                  <div>Acompanado por <a href="" className="text-info">Dr. Rodriguez</a>.</div>
                </div>
              </div>
            </div>
            <a href="" className="btn btn-sm success text-u-c m-y-sm">Ver mas</a>
  		</div>
    );
  }
}

export default ExitInsigth;
