import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextareaField, RadioField, HiddenField } from 'commons/form'
import { createComment } from '../actions';

class CommentForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const initData = {
      VisitorId: this.props.visitor.id
    };

    this.props.initialize(initData);
  }

  onSubmit(values) {
    this.props.createComment(values, this.props.hide);
  }

  render() {
    const { handleSubmit } = this.props;
    const commentTypes = [
      { display: 'Informacion', value: 'primary', decorator: 'blue' },
      { display: 'Advertencia', value: 'warn', decorator: 'yellow' },
      { display: 'Amonestacion', value: 'danger', decorator: 'red' }];

    return (
      <div className="box">
        <div className="box-header blue">
          <h3>Nueva Alerta</h3>
          <small>Ingrese los detalles sobre la alerta.</small>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="box-body b-t">
            <Field label="Descripcion:" rows="2" name="comment" component={ TextareaField }/>
            <Field label="Tipo:" name="type" options={ commentTypes } component={ RadioField } />
            <Field name="VisitorId"  component={ HiddenField }/>
          </div>
          <div className="dker p-a text-right">
            <button className="btn btn-sm white text-u-c m-r" onClick={ this.props.hide  }>Cancel</button>
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
  if (!values.comment) {
    errors.comment = 'Campo comentario es necesario.';
  }
  if (!values.type) {
    errors.type = 'Campo tipo es necesario.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate,
  form: 'CommentForm'
})(
  connect(
    state => ({
      visitor: state.activeVisitor
    }), { createComment })(CommentForm)
);
