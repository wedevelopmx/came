import React, { Component } from 'react';
import DatepickerInput from './datepicker_input';

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

  return (
    <div className={className}>
      <label>{field.label}</label>
      <DatepickerInput fieldInput={field.input} />
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
          <i className="blue"></i>
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
        rows="3"></textarea>
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}
