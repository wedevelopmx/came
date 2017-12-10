import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectVisitor } from '../actions';
import moment from 'moment';
import { ButtonModal, ModalWrapper } from 'commons/flipper'
import DepartureForm from './container_departure_form';
import VisitorDetails from './container_visitor_details';

class VisitorCard extends Component {
  constructor(props) {
    super(props);
    this.state = { details: false };
  }
  componentDidMount() {
    moment.locale('es');
  }

  toggleDetails() {
    console.log('toggle')
    this.setState({ details: !this.state.details });
  }

  renderDetals() {
    const {visitor} = this.props;

    if(this.state.details) {
      return (
        <ModalWrapper>
          <VisitorDetails  visitor={visitor} onClose={this.toggleDetails.bind(this)}/>
        </ModalWrapper>
      );
    }
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
          	<p className={`frame fm-md fm-${visitor.alert}`}>
              <img src={ '/api/visitor/' + visitor.avatar + '/avatar' } className="picture" onClick={this.toggleDetails.bind(this)}/>
            </p>
            { this.renderDetals() }
            <div>
              <span className="text-md block">
                { `${visitor.firstName} ${visitor.lastName}` }
              </span>
              <small className="text-sm text-muted block">
                <i className="material-icons m-r-xs">event</i> { moment(new Date(visitor.birthdate)).fromNow(true) } &nbsp;
                  | <i className="material-icons m-r-xs">room</i> { `${visitor.state}, ${visitor.country}` } &nbsp;
                  | <i className="material-icons m-r-xs">airline_seat_individual_suite</i> { moment(new Date(visitor.departure.startDate)).fromNow(true) }
              </small>
              <span className="block p-t">
                <ButtonModal className="btn btn-sm btn-outline rounded b-danger" text="Salida" component={DepartureForm} reference={visitor}></ButtonModal>
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
