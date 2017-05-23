import React, { Component } from 'react';

class FollowUpInsigth extends Component {
  render() {
    return (
      <div className="box-body b-t">
		  	<div className="streamline b-l m-b m-l">
              <div className="sl-item">
                <div className="sl-left">
                  <span className="w-40 circle green">
                    <i className="material-icons w-24">local_hospital </i>
	                </span>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Médico</a><span className="m-l-sm sl-date">Today</span>
                  <div>Atencion medica <a href="" className="text-info">Dr. Juarez</a>.</div>
                </div>
              </div>
              <div className="sl-item">
                <div className="sl-left">
                  <span className="w-40 circle green">
                    <i className="material-icons w-24">account_balance </i>
	                </span>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Jurídico</a><span className="m-l-sm sl-date">Miercoles, 21 Mayo</span>
                  <div>Seguimeinto a definir</div>
                </div>
              </div>
              <div className="sl-item">
                <div className="sl-left">
                  <span className="w-40 circle green">
                    <i className="material-icons w-24">face </i>
	                </span>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Psicosocial</a><span className="m-l-sm sl-date">1 hour ago</span>
                  <div>Sin comentarios</div>
                </div>
              </div>
            </div>
  		</div>
    );
  }
}

export default FollowUpInsigth;
