import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVisitors, selectVisitor } from '../actions';

class VisitorProfileCard extends Component {
  render() {
    if(this.props.visitor == null) {
        return (<div></div>);
    }

    const _self = this;
    const {visitor} = this.props;

    return (
      <div className="box text-center">
					<div className="box-tool">
                <ul className="nav">
                  <li className="nav-item inline">
                    <a className="nav-link" onClick={() => _self.props.selectVisitor(null) }>
                      <i className="material-icons md-18">close</i>
                    </a>
                  </li>
                  <li className="nav-item inline dropdown">
                    <a className="nav-link" data-toggle="dropdown" aria-expanded="false">
                      <i className="material-icons md-18">more_vert</i>
                    </a>
                    <div className="dropdown-menu pull-right">
                      <a className="dropdown-item" href="">Action</a>
                      <a className="dropdown-item" href="">Another action</a>
                      <a className="dropdown-item" href="">Something else here</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item">Separated link</a>
                    </div>
                  </li>
                </ul>
				    </div>
				    <div className="p-a-md">
				    	<p className="frame fm-md"><img src={ '/api/visitor/' + visitor.id + '/avatar' } className="picture"/></p>
              <div>
                <span>{ visitor.firstName } { visitor.lastName }</span>
              </div>
				    	<p><small>{ visitor.state }, { visitor.country }</small></p>
              <Link to={ '/visitor/' + visitor.id } className="btn btn-sm btn-outline rounded b-accent">Detalles</Link>
				    </div>
				    <div className="row no-gutter b-t">
					  <div className="col-xs-4 b-r">
					    <a className="p-a block text-center" ui-toggle-className="">
					      <i className="material-icons md-24 text-muted m-v-sm inline"></i>
					      <i className="material-icons md-24 text-danger m-v-sm none"></i>
					      <span className="block">Group</span>
					    </a>
					  </div>
					  <div className="col-xs-4 b-r">
					    <a className="p-a block text-center" ui-toggle-className="">
					      <i className="material-icons md-24 text-muted m-v-sm none"></i>
					      <i className="material-icons md-24 text-danger m-v-sm inline"></i>
					      <span className="block">Like</span>
					    </a>
					  </div>
					  <div className="col-xs-4">
					    <a className="p-a block text-center" ui-toggle-className="">
					      <i className="material-icons md-24 text-muted m-v-sm inline"></i>
					      <i className="material-icons md-24 text-danger m-v-sm none"></i>
					      <span className="block">Chat</span>
					    </a>
					  </div>
					 </div>
				  </div>
    );
  }
}

export default connect((state) => {
  return {
    visitor: state.activeVisitor
  };
}, { selectVisitor})(VisitorProfileCard);
