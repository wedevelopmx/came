import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextareaField, SelectField, HiddenField, DatepickerField } from 'commons/form'
import { fetchAppointmentCatalog } from 'category/actions';
import { fetchCategories } from 'search/actions';
import { createCheckout, selectReason } from '../actions';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { reasonList: [] };
  }

  componentDidMount() {
    this.handleInitialize();
    this.props.fetchAppointmentCatalog();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appointmentCatalog && nextProps.appointmentCatalog.salida) {
      const { salida } = nextProps.appointmentCatalog;
      const reasonList =  salida.map((option) => { return { value: option._id, display: option.name }; });
      const reasonHash = _.keyBy(salida, (option) => { return option._id } );
      this.setState({
        reasonList, reasonHash
      });
    }
  }

  handleInitialize() {
    const initData = {
      VisitorId: this.props.visitor.id,
      startDate: new Date()
    };

    this.props.initialize(initData);
  }

  onChange(value) {
    const { name: reason, time: tolerance } = this.state.reasonHash[value];
    this.props.selectReason({ reason, tolerance });
  }

  onSubmit(values) {
    // Remove useful fields
    delete values.reasonSelect;
    // Convert moment date
    if(!(values.startDate instanceof Date))
      values.startDate = new Date(values.startDate.toDate().getTime());

    this.props.createCheckout(values, this.props.onComplete);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="box">
        <div className="box-header blue">
          <h3>Nueva salida</h3>
          <small>Ingrese los detalles sobre la salida.</small>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="box-body b-t">
            <Field label="Fecha:" name="startDate" component={ DatepickerField } />
            <Field label="Razon:" name="reasonSelect" onChange={ (evt) => this.onChange(evt.target.value) } options={ this.state.reasonList } component={ SelectField } />
            <Field label="Descripcion:" rows="2" name="comment" component={ TextareaField }/>
            <Field name="VisitorId"  component={ HiddenField }/>
            <Field name="reason" component={ HiddenField }/>
            <Field name="tolerance" component={ HiddenField }/>
          </div>
          <div className="dker p-a text-right">
            <button className="btn btn-sm white text-u-c m-r" onClick={ () => this.props.onComplete() }>Cancel</button>
            <button type="submit" className="btn btn-sm info text-u-c">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.startDate) {
    errors.startDate = 'Campo fecha es necesario.';
  }

  if (!values.reasonSelect) {
    errors.reasonSelect = 'Campo razon es necesario.';
  }

  if (!values.comment) {
    errors.comment = 'Campo descripcion es necesario.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate,
  form: 'CheckoutForm'
})(
  connect(
    state => ({
      appointmentCatalog: state.appointmentCatalog,
      visitor: state.activeVisitor
    }), { fetchCategories, createCheckout, fetchAppointmentCatalog, selectReason } )(CheckoutForm)
);
