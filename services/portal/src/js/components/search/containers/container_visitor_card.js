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
      <div className="box expanse">
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
          	<p className="frame fm-md"><img src={ '/api/visitor/' + visitor.avatar + '/avatar' } className="picture"/></p>
            <div>
              <span className="text-md block">
                { `${visitor.firstName} ${visitor.lastName}` }
              </span>
              <small className="text-sm text-muted block">
                <i className="material-icons m-r-xs">event</i> { moment(new Date(visitor.birthdate)).fromNow(true) } | <i className="material-icons m-r-xs">room</i> { `${visitor.state}, ${visitor.country}` }
              </small>
              <span className="block p-t">
                <a href="" className="btn btn-sm btn-outline rounded b-danger">Salida</a>
              </span>
            </div>
          </div>
  			</div>
        { this.props.children }
      </div>
    );
  }
}

export default connect((state) => {
  return {
    visitor: state.activeVisitor
  };
}, { selectVisitor})(VisitorCard);
