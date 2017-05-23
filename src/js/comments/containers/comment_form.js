import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextareaField, RadioField, HiddenField } from '../../commons/form'
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
    this.props.createComment(values, this.props.hideForm);
  }

  render() {
    const { handleSubmit } = this.props;
    const commentTypes = [
      { display: 'Informacion', value: 'primary' },
      { display: 'Advertencia', value: 'warn' },
      { display: 'Amonestacion', value: 'danger' }];

    return (
      <div className="box-body b-t">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="VisitorId"  component={ HiddenField }/>
          <Field label="Comentario" name="comment" component={ TextareaField }/>
          <Field label="Tipo" name="type" options={ commentTypes } component={ RadioField } />
          <div className="text-right">
            <button className="btn btn-sm white text-u-c" onClick={ this.props.hideForm }>Cancel</button>
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
