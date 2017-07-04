import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchVisitors, fetchCategories } from '../../actions';
import { TextInput, SelectField } from './form-controls'

class AdvancedSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { genderList: [], statusList: [], checkoutList: [] };
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      const genderList = nextProps.categories.gender.map((gender) => { return { value: gender, display: gender } });
      const statusList = nextProps.categories.status.map((status) => { return { value: status, display: status } });
      const checkoutList = nextProps.categories.checkout.map((checkout) => { return { value: checkout, display: checkout } });

      genderList.push({ value: '', display: 'Todas' });
      statusList.push({ value: '', display: 'Todas' });
      checkoutList.push({ value: '', display: 'Todas' });

      this.setState({
        genderList, statusList, checkoutList
      });
    }
  }

  submit(values) {
    this.props.fetchVisitors(values);
  }

  render() {
    const { handleSubmit } = this.props;
    
    return (
      <form className="search-bar" onSubmit={ handleSubmit(this.submit.bind(this)) } >
        <div className="form-group l-h m-a-0">
          <div className="input-group input-group-sm">
            <Field name="term" component={ TextInput } placeholder="Buscar visitante..."/>
            <span className="input-group-btn">
              <button type="submit" className="btn white b-a rounded no-shadow">
                <i className="material-icons">search</i>
              </button>
              <a onClick={ this.props.onSimple } className="btn danger b-a rounded no-shadow">
                <i className="material-icons">filter_list</i>
              </a>
            </span>
          </div>
        </div>
        <div className="container p-t white">
          <Field label="Sexo" name="gender" options={this.state.genderList} component={ SelectField } />
          <Field label="Tipo" name="status" options={this.state.statusList} component={ SelectField } />
          <Field label="Salida" name="checkout" options={this.state.checkoutList} component={ SelectField } />
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  return errors;
}


export default reduxForm({
  validate: validate,
  form: 'AdvancedSearchBar'
})(connect((state) => {
  return {
    categories: state.categories
  };
}, { fetchVisitors, fetchCategories })(AdvancedSearchBar));
