import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { SimpleHiddenField } from 'commons/form'
import { updateUser, setActiveUser } from '../actions';

class UserForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    this.props.initialize(this.props.user);
  }

  onSubmit(values) {
    this.props.updateUser(values, () => {
      this.props.setActiveUser(null);
    });
  }

  render() {
    const { handleSubmit, user } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <Field name="local.email"  component={ SimpleHiddenField }/>
        <Field name="_id"  component={ SimpleHiddenField }/>
        <Field name="roles"  component={ SimpleHiddenField }/>
        <button className="btn btn-icon btn-rounded btn-danger"><i className="material-icons">save</i></button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  return errors;
}


export default reduxForm({
  validate,
  form: 'UserForm'
})(
  connect(null, { updateUser, setActiveUser })(UserForm)
);
