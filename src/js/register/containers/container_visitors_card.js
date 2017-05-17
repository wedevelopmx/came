import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { selectVisitor } from '../actions/index';

class VisitorList extends Component {
  renderVisitors() {
    let _self = this;
    return this.props.visitors.map(function(visitor) {
      return (
        <li key={visitor.id} className="list-item" onClick={() => _self.props.selectVisitor(visitor) }>
          <a href="#/visitor/" className="list-left">
            <span className="w-64 avatar">
              <img src={visitor.avatar} alt="..."/> <i className="on b-white left"></i>
            </span>
          </a>
          <div className="list-body profile">
            <div>
              <a className="name" href="">{visitor.name}</a>
            </div>
            <small className="location text-muted text-ellipsis">
              <i className="fa fa-map-marker m-r-xs"></i>{visitor.state}, {visitor.country}
              </small>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="box">
        <div className="item dark">
          <a href=""><img src="./images/rails.jpg" className="w-full"/></a>
          <div className="bottom gd-overlay p-a-xs">
            <a href="" className="text-md block p-x-sm">Visitantes</a>
          </div>
        </div>
        <Link to="/visitor/new" className="md-btn md-raised md-fab md-mini m-r pos-rlt md-fab-offset pull-right blue">
          <i className="material-icons md-24">add</i>
        </Link>
        <div className="p-a">
          <div className="text-muted m-b-xs">
            <span className="m-r">May 12, 2015</span>
            <a href="" className="m-r"><i className="material-icons md-12">favorite</i> 4</a>
            <a href=""><i className="material-icons md-12">bookmark</i> 20</a>
          </div>
          <ul className="list inset m-a-0">
            { this.renderVisitors() }
          </ul>
        </div>
      </div>
    );
  }
}

//Reducer State (rootReducer)
function mapStateToProps(state) {
  // Generating props for VisitorList
  return {
    visitors: state.visitors
  };
}

function mapDispatchToProps(dispatch) {
  // When selectVisitor is called, then send return value at dispatch
  return bindActionCreators({
    selectVisitor: selectVisitor
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitorList);
