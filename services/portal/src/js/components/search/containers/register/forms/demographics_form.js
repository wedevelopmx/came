import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { SelectField } from 'commons/form'

class DemographicForm extends Component {
  constructor(props) {
    super(props);
    this.state = { genderList: [], statusList: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      const genderList = nextProps.categories.gender.map((gender) => { return { value: gender, display: gender } });
      const statusList = nextProps.categories.status.map((status) => { return { value: status, display: status } });

      this.setState({
        genderList, statusList
      });
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Sexo" name="gender" options={ this.state.genderList } component={ SelectField } />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Status" name="status" options={ this.state.statusList } component={ SelectField } />
          </div>
        </div>
        { this.props.children }
      </form>
    );
  }
}

function validateDemographicForm(values) {
  const errors = {};

  if (!values.gender) {
    errors.gender = 'Campo sexo es necesario.';
  }
  if (!values.status) {
    errors.status = 'Campo status es necesario.';
  }

  return errors;
}


export default reduxForm({
  validate: validateDemographicForm,
  form: 'RegisterForm',
  destroyOnUnmount: false
})(connect((state) => {
  return {
    categories: state.categories
  };
}, { })(DemographicForm));
