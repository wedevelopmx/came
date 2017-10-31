import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputField, SelectField } from 'commons/form'
import { selectCountry, fetchCities } from 'search/actions'

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: [], cities: [], countriesHash: {} };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.countries) {
      const countriesHash = {};
      nextProps.countries.forEach((country) => { countriesHash[country._id] = country; });

      const countries = nextProps.countries.map((country) => { return { value: country._id, display: country.name } });
      this.setState({ countries, countriesHash });
    }

    if (nextProps.cities) {
      const cities = nextProps.cities.map((city) => { return { value: city, display: city } });
      this.setState({ cities });
    }
  }

  onSelectCountry(event, countryId) {
    this.props.fetchCities(countryId);

    this.props.selectCountry(this.state.countriesHash[countryId].name);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Pais" name="countryHelper" options={ this.state.countries } onChange={ this.onSelectCountry.bind(this) } component={ SelectField } />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field label="Estado" name="state" options={ this.state.cities } component={ SelectField } />
          </div>
        </div>
        <div className="row m-b">
          <div className="col-sm-12 col-md-6">
            <Field label="Municipio" name="town" component={ InputField } />
          </div>
          <div className="col-sm-12 col-md-6">

          </div>
        </div>
        { this.props.children }
      </form>
    );
  }
}

function validateLocationForm(values) {
  const errors = {};
  if (!values.country) {
    errors.country = 'Campo pais es necesario.';
  }
  if (!values.state) {
    errors.state = 'Campo estado es necesario.';
  }
  if (!values.town) {
    errors.town = 'Campo municipio es necesario.';
  }
  return errors;
}

export default reduxForm({
  validate: validateLocationForm,
  form: 'RegisterForm',
  destroyOnUnmount: false
})(connect((state) => {
  return {
    countries: state.countries,
    cities: state.cities
  };
}, { selectCountry, fetchCities })(LocationForm));
