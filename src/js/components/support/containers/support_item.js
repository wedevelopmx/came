import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchServices } from 'service/actions'
import { createSupport } from '../actions';
import { Tabs } from 'commons/tab';
import { Slider, SlideWrapper } from 'commons/flipper';
import { AppointmentList, AppointmentForm } from 'appointment';

function ItemDetails(props) {
  const { activeItem } = props;
  return (
    <div className="box-body b-t">
      <div className="row m-b">
        <div className="col-xs-6">
          <small className="text-muted">Tipo:</small>
          <div className="_500">{ activeItem.name }</div>
        </div>
        <div className="col-xs-6">
          <small className="text-muted">Fecha de Inicio:</small>
          <div className="_500">{ moment(new Date(activeItem.startDate)).format('MMMM DD YYYY') }</div>
        </div>
      </div>
      <div className="row m-b">
        <div className="col-xs-6">
          <small className="text-muted">Entrevista de valoracion</small>
          <div className="_500 form-group">
            <label className="ui-check">
              <input type="checkbox" defaultValue={activeItem.interview}/>
              <i className="dark-white"></i>
              &nbsp;{activeItem.interviewComment}
            </label>
          </div>
        </div>
        <div className="col-xs-6">
          <small className="text-muted">Entrevista de valoracion psicologica</small>
          <div className="_500 form-group">
            <label className="ui-check">
              <input type="checkbox" defaultValue={activeItem.psychological}/>
              <i className="dark-white"></i>
              &nbsp;{activeItem.psychologicalComment}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

class SupportItem extends Component {
  componentDidMount() {

  }

  render() {
    const { activeItem } = this.props;
    const serviceList = _.map(this.props.services, service => { return { value: service.id, display: service.name } });
    const availableServicesList = _.filter(serviceList, service => { !this.props.supports.hasOwnProperty(service.id) });

    return (
      <div className="box">
        <div className="box-header blue">
          <h3><i className="material-icons md-24">{ activeItem.resource }</i>&nbsp;{ activeItem.name }</h3>
          <small>{ activeItem.description }</small>
          <div className="box-tool">
            <ul className="nav">
              <li className="nav-item inline">
                <a className="nav-link" onClick={ () => this.props.onComplete()  }>
                  <i className="material-icons md-18">close</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Tabs selected="0">
          <Slider title="Citas" icon="format_list_bulleted" parent={activeItem} list={AppointmentList} create={AppointmentForm} update={AppointmentForm} decorator={SlideWrapper}/>
          <ItemDetails title="Detalles" icon="assignment" activeItem={activeItem}/>
        </Tabs>
      </div>
    );
  }
}

export default connect(
    state => ({
      supports: state.supports,
      services: state.services,
      visitor: state.activeVisitor
    }), { fetchServices, createSupport })(SupportItem);
