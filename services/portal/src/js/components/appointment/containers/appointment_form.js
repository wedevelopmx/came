import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ActivityValidationField, CheckBoxField, TextareaField, SelectField, HiddenField, DatepickerField } from 'commons/form';
import { createAppointment, updateAppointment } from '../actions';
import { fetchCategories } from 'search/actions';

class AppointmentForm extends Component {
  constructor(props) {
      super(props);
      this.state = { reasonList: [] };
  }

  componentDidMount() {
    console.log('activeItem', this.props.parent.appointmentCatalog)
    this.props.fetchCategories();
    this.handleInitialize();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.categories.hasOwnProperty(nextProps.parent.appointmentCatalog)) {
      const reasonList = nextProps.categories[nextProps.parent.appointmentCatalog].map((entry) => {
        return { value: entry, display: entry};
      });

      this.setState({ reasonList });
    }
  }

  handleInitialize() {
    if(this.props.activeItem) {
      const { id, VisitorId, SupportId, startDate, scheduleEndDate, reason, comment } = this.props.activeItem;
      this.props.initialize({
        id, VisitorId, SupportId, startDate: new Date(startDate), scheduleEndDate: new Date(scheduleEndDate), reason, comment
      });
    } else {
      this.props.initialize({
        SupportId: this.props.parent.id,
        startDate: new Date()
      });
    }
  }

  onSubmit(values) {
    if(values.id) {
      this.props.updateAppointment(values, this.props.onComplete);
    } else {
      this.props.createAppointment(values, this.props.onComplete);
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form  onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="box-body b-t">
            <Field label="Salida:" name="startDate" component={ DatepickerField } />
            <Field label="Retorno:" name="scheduleEndDate" component={ DatepickerField } />
            <Field label="Razon:" name="reason" options={ this.state.reasonList } component={ SelectField } />
            <Field label="Descripcion:" rows="2" name="comment" component={ TextareaField }/>
            <Field name="VisitorId"  component={ HiddenField }/>
            <Field name="SupportId"  component={ HiddenField }/>
            <Field name="id"  component={ HiddenField }/>
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

  if (!values.endDate) {
    errors.endDate = 'Campo fecha es necesario.';
  }

  if (!values.scheduleEndDate) {
    errors.startDate = 'Campo fecha es necesario.';
  }

  if (!values.reason) {
    errors.reason = 'Campo razon es necesario.';
  }

  if (!values.comment) {
    errors.comment = 'Campo descripcion es necesario.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'AppointmentForm'
})(
  connect(
    state => ({
      categories: state.categories
    }), { createAppointment, updateAppointment, fetchCategories })(AppointmentForm)
);
