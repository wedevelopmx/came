import React, { Component } from 'react';
import DateTime from 'react-datetime';

export function CheckBoxField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label className="ui-check">
        <input {...field.input} type="checkbox"/>
        <i className="dark-white"></i>
        {field.label}
      </label>
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}

export function HiddenField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  return (
    <div className={className}>
      <input
        type="hidden"
        {...field.input}
      />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}

export function SimpleHiddenField(field) {
  return (
    <input
      type="hidden"
      {...field.input}
    />
  );
}

export function InputField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <input
        className="form-control"
        type="text"
        {...field.input}
        disabled={field.disabled}
      />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}

export function DatepickerField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  const inputDate = field.input.value ? new Date(field.input.value) :  new Date(); //value={ inputDate } defaultValue={ inputDate }
  const inputProps = { disabled: field.disabled, name: field.input.name };

  return (
    <div className={className}>
      <label>{field.label}</label>
      <DateTime {...field.input} inputProps={inputProps} dateFormat="ddd, MMMM Do YYYY" timeFormat="h:mm a" />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}

function selectOptionsHelper(options) {
  return options.map(function(option) {
    return <option key={option.value} value={ option.value }>{ option.display }</option>
  });
}

export function SelectField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <select
        className="form-control"
        {...field.input}>
        <option value="0">-- Seleccionar --</option>
        { selectOptionsHelper(field.options) }
      </select>
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}

export function SimpleSelectField(field) {
  return (
    <div className={field.className}>
      <select
        className="form-control form-control-sm"
        {...field.input}>
        { selectOptionsHelper(field.options) }
      </select>
    </div>
  );
}

function radioOptionsHelper(field) {
  return field.options.map(function(option) {
    return (
      <p key={option.value}>
        <label className="md-check">
          <input
            {...field.input}
            value={option.value}
            className="has-value"
            type="radio"/>
          <i className={option.value}></i>
          <span className="text-muted">{ option.display }</span>
        </label>
      </p>
    );
  });
}

export function RadioField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label className="block">{field.label}</label>

      { radioOptionsHelper(field) }

      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}

export function TextareaField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''} ${field.warning ? 'has-warning' : '' }`;
  
  const bullets = [];
  if(touched && error) bullets.push(<li>{error}</li>);
  if(field.warning) bullets.push(<li>{field.warning}</li>);
  
  return (
    <div className={className}>
      <label>{field.label}</label>
      <textarea
        {...field.input}
        className="form-control"
        ></textarea>
      <div className="text-help">
        <ul>
          {bullets}
        </ul>
      </div>
    </div>
  );
}
