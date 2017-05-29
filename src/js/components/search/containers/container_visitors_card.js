import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchVisitors, selectVisitor } from '../actions';

import SearchBar from './container_search_bar';

class VisitorList extends Component {
  componentDidMount() {
    this.props.fetchVisitors();
  }

  renderVisitors() {
    let _self = this;

    if(this.props.visitors == null)
      return (<div>Loading...</div>);

    return _.map(this.props.visitors, visitor => {
      return (
        <li key={visitor.id} className="list-item" onClick={() => _self.props.selectVisitor(visitor) }>
          <a href="#/visitor/" className="list-left">
            <span className="frame fm-sm">
              <img className="picture" src={'/api/visitor/' + visitor.id + '/avatar'} alt="..."/> <i className="on b-white left"></i>
            </span>
          </a>
          <div className="list-body profile">
            <div>
              <span className="name" href="">{visitor.firstName} {visitor.lastName} {visitor.secondSurename}</span>
            </div>
            <small className="location text-muted text-ellipsis">
              <i className="fa fa-map-marker m-r-xs"></i>{visitor.state}, {visitor.country}
              </small>
          </div>
        </li>
      );
    });
  }

  submit() {
    console.log('SearchBar Submit');
  }

  render() {
    return (
      <div className="box widget">
        <div className="fit item dark">
          <form className="search-bar" onSubmit={ this.submit() }>
            <div className="form-group l-h m-a-0">
              <div className="input-group input-group-sm">
                <input className="form-control p-x b-a rounded" placeholder="Buscar visitante..." type="text"/>
                <span className="input-group-btn">
                  <button type="submit" className="btn white b-a rounded no-shadow">
                    <i className="material-icons">search</i>
                  </button>
                </span>
              </div>
            </div>
          </form>
          <img src="./images/rails_xs.jpg" className="w-full"/>
          <div className="bottom gd-overlay p-a-xs">
            <a href="" className="text-md block p-x-sm">Visitantes</a>
          </div>
          <a onClick={ () => this.props.onCreate() } className="md-btn md-raised md-fab md-mini m-r pos-rlt md-fab-offset pull-right blue">
            <i className="material-icons md-24">add</i>
          </a>
        </div>
        <div className="fix p-a">
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

export default connect(mapStateToProps, { fetchVisitors, selectVisitor })(VisitorList);
