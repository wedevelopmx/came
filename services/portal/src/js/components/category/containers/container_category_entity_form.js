import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextareaField, InputField, HiddenField } from 'commons/form'
import { createCategoryEntity, updateCategoryEntity } from '../actions';

class CategoryEntityForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    if(this.props.activeItem) {
      this.props.initialize(this.props.activeItem);
    } else {
      this.props.initialize({
        CategoryId: this.props.category.id
      });
    }
  }

  onSubmit(values) {
    if(this.props.activeItem) {
      this.props.updateCategoryEntity(this.props.category._id, values, this.props.onComplete);
    } else {
      this.props.createCategoryEntity(this.props.category._id, values, this.props.onComplete);
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="box">
        <div className="box-header blue">
          <h3>Nueva Entrada</h3>
          <small>Ingresa los detalles de la nueva entrada</small>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="box-body b-t">
            <Field label="Nombre:" name="name" component={ InputField }/>
            <Field label="Descripcion:" rows="2" name="description" component={ TextareaField }/>
            <Field name="CategoryId"  component={ HiddenField }/>
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
  if (!values.name) {
    errors.name = 'Campo nombre es necesario.';
  }

  if (!values.descripcion) {
    errors.descripcion = 'Campo descripcion es necesario.';
  }

  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate,
  form: 'EntityForm'
})(
  connect(
    state => ({
      category: state.category
    }), { createCategoryEntity, updateCategoryEntity } )(CategoryEntityForm)
);
