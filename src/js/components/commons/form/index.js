import React, { Component } from 'react';
import DateTime from 'react-datetime';

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
        { selectOptionsHelper(field.options) }
      </select>
      <div className="text-help">
        {touched ? error : ''}
      </div>
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
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <textarea
        {...field.input}
        className="form-control"
        ></textarea>
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}
