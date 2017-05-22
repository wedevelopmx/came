import React, { Component } from 'react';

class CommentsInsight extends Component {
  render() {
    return (
      <div className="box-body b-t">
        <div className="streamline b-l m-l">
  	        <div className="sl-item b-warning">
  	          <div className="sl-icon">
  	            <i className="material-icons">close</i>
  	          </div>
  	          <div className="sl-content">
  	            <div className="sl-date text-muted">8:30</div>
  	            <div>Conflicto en cafeteria con otro visitante.</div>
  	          </div>
  	        </div>
  	        <div className="sl-item b-success">
  	          <div className="sl-content">
  	            <div className="sl-date text-muted">Sat, 5 Mar</div>
  	            <div>Se ofrecio a hacer el aseo de zona comun</div>
  	          </div>
  	        </div>
  	        <div className="sl-item b-info">
  	          <div className="sl-content">
  	            <div className="sl-date text-muted">Sun, 11 Feb</div>
  	            <div>Pregunto sobre apoyo legal.</div>
  	          </div>
  	        </div>
  	    </div>
      </div>
    );
  }
}

export default CommentsInsight;
