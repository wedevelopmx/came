import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextareaField, SelectField, HiddenField, DatepickerField } from 'commons/form'
import { fetchCategories } from 'search/actions';
import { createCheckout } from '../actions';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { reasonList: [] };
  }

  componentDidMount() {
    this.handleInitialize();
    this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories && nextProps.categories.checkout) {
      const reasonList = nextProps.categories.checkout.map((reason) => { return { value: reason, display: reason } });
      this.setState({
        reasonList
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

  onSubmit(values) {
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
            <Field label="Razon:" name="reason" options={ this.state.reasonList } component={ SelectField } />
            <Field label="Descripcion:" rows="2" name="comment" component={ TextareaField }/>
            <Field name="VisitorId"  component={ HiddenField }/>
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
  form: 'CheckoutForm'
})(
  connect(
    state => ({
      categories: state.categories,
      visitor: state.activeVisitor
    }), { fetchCategories, createCheckout } )(CheckoutForm)
);
