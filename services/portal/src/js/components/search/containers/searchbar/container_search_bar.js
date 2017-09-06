import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchVisitors, fetchCategories, removeSerchCriteria } from 'search/actions';
import { TextInput, SelectField, DatepickerField, SimpleDatepickerField } from './form-controls'
import { SimpleSelectField, SimpleHiddenField } from 'commons/form';

class InlineSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { demo: false, checkin: false, genderList: [], statusList: [], departureList: [] };
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      const genderList = nextProps.categories.gender.map((gender) => { return { value: gender, display: gender } });
      const statusList = nextProps.categories.status.map((status) => { return { value: status, display: status } });
      const departureList = nextProps.categories.departure.map((checkout) => { return { value: checkout, display: checkout } });

      genderList.push({ value: '', display: 'Todas' });
      statusList.push({ value: '', display: 'Todas' });
      departureList.push({ value: 'all', display: 'Todas' });

      this.setState({
        genderList, statusList, departureList
      });
    }
  }

  submit(values) {
    this.props.fetchVisitors(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="form" onSubmit={ handleSubmit(this.submit.bind(this)) }>
        <div className="form-group l-h m-a-0">
          <div className="input-group input-group-sm">
            <Field name="term" component={ TextInput } placeholder="Buscar visitante..."/>
            <span className="input-group-btn">
              <button type="submit" className="btn white b-a rounded no-shadow">
                <i className="material-icons">search</i>
              </button>
              <button className={`btn b-a no-shadow ${this.state.checkin ? '': 'white' }`}
                onClick={ ()=> { this.setState({ checkin: !this.state.checkin })  } } >
                Fechas <i className="material-icons">event</i>
              </button>
              <button className={`btn b-a no-shadow ${this.state.demo ? ' ': 'white' }` }
                 onClick={ ()=> { this.setState({ demo: !this.state.demo })  } } >
                Mas <i className="material-icons">filter_list</i>
              </button>
              <Field name="orderBy" component={SimpleHiddenField}/>
              <Field name="order" component={SimpleHiddenField}/>
            </span>
          </div>
        </div>
        { this.renderDemographicsFilters() }
        { this.renderDateFilters() }
        { this.renderSelectedFilters() }
      </form>
    );
  }

  renderDemographicsFilters() {
    if(!this.state.demo) return ( <div></div>);
    return (
      <div className="form-group row p-t-sm m-b-0">
        <label className="form-control-label col-sm-1">Sexo: </label>
        <Field name="gender" className="col-sm-3" options={this.state.genderList} component={ SimpleSelectField } />
        <label className="form-control-label col-sm-1">Visitante: </label>
        <Field name="status" className="col-sm-3" options={this.state.statusList} component={ SimpleSelectField } />
        <label className="form-control-label col-sm-1">Salida: </label>
        <Field name="departure" className="col-sm-3" options={this.state.departureList} component={ SimpleSelectField } />
      </div>
    );
  }

  renderDateFilters() {
    if(!this.state.checkin) return ( <div></div>);
    return (
      <div className="form-group form-group-sm row p-t-sm m-b-0">
        <label className="form-control-label col-sm-1">Entrada: </label>
        <Field name="checkinFrom" className="col-sm-2" component={ SimpleDatepickerField } />
        <Field name="checkinTo" className="col-sm-2" component={ SimpleDatepickerField } />
        <label className="form-control-label col-sm-1">Salida: </label>
        <Field name="checkoutFrom" className="col-sm-2" component={ SimpleDatepickerField } />
        <Field name="checkoutTo" className="col-sm-2" component={ SimpleDatepickerField } />
      </div>
    );
  }

  renderSelectedFilters() {
    let _self = this;
    let filters = [];

    if(this.props.form && this.props.form.values) {
      _.forEach(this.props.form.values, function(value, key) {
        let display = moment.isMoment(value) ? `${key}: ${value.format('DD/MM/YYYY')}` :  value;

        filters.push(
          <button key={display} className="btn btn-sm success white m-r-sm m-b-sm" onClick={ () => _self.props.removeSerchCriteria(key) }>
            { display } <i className="material-icons m-r-xs">clear</i>
          </button>
        );
      });

      return (
        <div className="form-group row p-t-sm m-b-0">
          <span className="form-control-label col-sm-1">Filtros: </span> <div className="col-sm-10">{filters}</div>
        </div>
      )
    } else {
      return (<div></div>);
    }
  }
}

function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'InlineSearchBar'
})(connect((state) => {
  return {
    categories: state.categories,
    form: state.form.InlineSearchBar
  };
}, { fetchVisitors, fetchCategories, removeSerchCriteria })(InlineSearchBar));
