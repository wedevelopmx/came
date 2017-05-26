import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectVisitor } from '../actions';
import moment from 'moment';

class VisitorCard extends Component {
  componentDidMount() {
    moment.locale('es');
  }

  render() {

    if(this.props.visitor == null) {
        return (<div></div>);
    }

    const _self = this;
    const {visitor} = this.props;

    return (
      <div className="box widget">
        <div className="fit">
          <div className="box-tool">
            <ul className="nav">
              <li className="nav-item inline">
                <a className="nav-link" onClick={() => _self.props.selectVisitor(null) }>
                  <i className="material-icons md-18">close</i>
                </a>
              </li>
            </ul>
          </div>
          <div className="p-a-md text-center">
          	<p className="frame fm-md"><img src={ '/api/visitor/' + visitor.id + '/avatar' } className="picture"/></p>
            <div>
              <span className="text-md block">{ visitor.firstName } { visitor.lastName }</span>
              <span><small>{ moment(new Date(visitor.birthdate)).fromNow(true) }</small></span>
            </div>
          	<p><small>{ visitor.state }, { visitor.country }</small></p>
          </div>
          { this.props.children }
  			</div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    visitor: state.activeVisitor
  };
}, { selectVisitor})(VisitorCard);
