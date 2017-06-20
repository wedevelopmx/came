import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { SelectField } from 'commons/form'
import { fetchCategoryEntities, FETCH_GENDER, FETCH_STATUS } from 'search/actions';

class DemographicForm extends Component {
  componentWillMount() {
      this.props.fetchCategoryEntities(29, FETCH_GENDER);
      this.props.fetchCategoryEntities(30, FETCH_STATUS);
  }

  render() {
    const { handleSubmit } = this.props;

    const genderList = _.map(this.props.genders, function(gender) { return { value: gender.id, display: gender.name }; });
    const statusList = _.map(this.props.status, function(status) { return { value: status.id, display: status.name }; });

    return (
      <form onSubmit={handleSubmit}>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Sexo" name="gender" options={ genderList } component={ SelectField } />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Status" name="status" options={ statusList } component={ SelectField } />
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
    genders: state.genders,
    status: state.status
  };
}, { fetchCategoryEntities })(DemographicForm));
