import React, { Component } from 'react';
import DatepickerInput from './datepicker_input';

export function hiddenField(field) {
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

export function inputField(field) {
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

export function datepickerField(field) {
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

export function optionsField(options) {
  return options.map(function(option) {
    return <option key={option.value} value={ option.value }>{ option.display }</option>
  });
}

export function selectField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <select
        className="form-control"
        {...field.input}>
        { optionsField(field.options) }
      </select>
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}
