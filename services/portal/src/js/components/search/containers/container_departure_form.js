import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextareaField, SelectField, HiddenField, DatepickerField } from 'commons/form'
import { fetchCategories } from 'category/actions';
import { createComment } from 'comments/actions';
import { saveDeparture } from '../actions';

class DepartureForm extends Component {
  constructor(props) {
    super(props);
    this.state = { departureList: [], danger: false };
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.handleInitialize();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories && nextProps.categories.departure) {
      const departureList = nextProps.categories.departure.map((checkout) => { return { value: checkout, display: checkout } });
      this.setState({ departureList });
    }
  }

  handleInitialize() {
    const departure = this.props.visitor.departure;
    this.props.initialize({
      state: departure.state,
      startDate: new Date(departure.startDate),
      scheduleEndDate: new Date(departure.scheduleEndDate),
      endDate: departure.endDate ? new Date(departure.endDate): new Date(),
      comment: departure.comment
    });
  }

  onSubmit(values) {
    if(this.props.actual.state === 'expulsado')
      this.props.createComment({ VisitorId: this.props.visitor.id, comment: values.comment, type: 'danger'}, () => {});      
    this.props.saveDeparture(this.props.visitor.id, values, this.props.onClose);
  }
  
  render() {
    const { handleSubmit } = this.props;
    let warning = this.props.actual && this.props.actual.state === 'expulsado' ? 'Debido al estatus de expulsión, este comentario será agregado como mensaje de alerta automáticamente.' : null;
    
    return (
      <div className="box text-left">
        <div className="box-header blue">
          <h3>Estancia</h3>
          <small>Estos son los detalles sobre la estancia del visitante.</small>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="box-body b-t">
            <div className="row">
              <div className="col-sm-6">
                <Field label="Estado" name="state" options={this.state.departureList} component={ SelectField }/>
              </div>
              <div className="col-sm-6">
                <Field label="Ingreso:" name="startDate" component={ DatepickerField } disabled/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <Field label="Salida Programada:" name="scheduleEndDate" component={ DatepickerField } disabled />
              </div>
              <div className="col-sm-6">
                <Field label="Salida Definitiva:" name="endDate" component={ DatepickerField } disabled />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Field label="Descripcion:" warning={warning} rows="2" name="comment" component={ TextareaField }/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <div className="pull-right">
                  <button onClick={ () => this.props.onClose() } className="btn btn-fw white m-r">Cancel</button>
                  <button type="submit" className="btn btn-fw info">Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.state) {
    errors.state = 'Campo estado es necesario.';
  }
  
  if(values.state === 'expulsado' && !values.comment) {
    errors.comment = 'Campo comentario es necesario.';
  }

  // Validate the inputs from 'values'
  if (!values.startDate) {
    errors.startDate = 'Campo fecha es necesario.';
  }

  // Validate the inputs from 'values'
  if (!values.scheduleEndDate) {
    errors.scheduleEndDate = 'Campo fecha salida programada es necesario.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate,
  form: 'DepartureForm'
})(
  connect(
    state => ({
      categories: state.categories,
      visitor: state.activeVisitor,
      actual: state.form.DepartureForm.values
    }), { fetchCategories, saveDeparture, createComment } )(DepartureForm)
);
