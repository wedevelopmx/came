import React, { Component } from 'react';
import DateTime from 'react-datetime';

export function TextInput(field) {
  return (
    <input className="form-control p-x b-a rounded" type="text" {...field.input}/>
  );
}

function selectOptionsHelper(options) {
  return options.map(function(option) {
    return <option key={option.value} value={ option.value }>{ option.display }</option>
  });
}

export function SelectField(field) {
  return (
    <div className={ `form-group form-group-sm l-h p-r ${ field.inline ? 'col-sm-2': 'row'}` }>
      <label className={ `form-control-label ${ field.inline ? '' : 'col-sm-2'}` } htmlFor={field.input.name} >{field.label}</label>
      <div className={ `${ field.inline ? '' : 'col-sm-10' }` }>
        <select id={field.input.name} className={ `form-control form-control-sm` } { ...field.input }>
        { selectOptionsHelper(field.options) }
        </select>
      </div>
    </div>
  );
}

export function DatepickerField(field) {
  const inputDate = field.input.value ? new Date(field.input.value) :  new Date(); //value={ inputDate } defaultValue={ inputDate }
  const inputProps = { disabled: field.disabled, name: field.input.name };

  return (
    <div className={ `form-group form-group-sm l-h p-r ${ field.inline ? '': 'row'}` }>
      <label className={ `form-control-label ${ field.inline ? '' : 'col-sm-2'}` } htmlFor={field.input.name}>{field.label}</label>
      <DateTime {...field.input} className={`form-control-sm ${ field.inline ? 'inline': ''}`} inputProps={inputProps} dateFormat="ddd, MMMM Do YYYY" timeFormat="h:mm a" />
    </div>
  );
}

export function SimpleDatepickerField(field) {
  const inputDate = field.input.value ? new Date(field.input.value) :  new Date(); //value={ inputDate } defaultValue={ inputDate }
  const inputProps = { disabled: field.disabled, name: field.input.name };

  return (
    <DateTime {...field.input} className={field.className} inputProps={inputProps} dateFormat="DD/MM/YYYY" timeFormat="h:mm a" />
  );
}

export function DatepickerRangeField(field) {
  const inputDate = field.input.value ? new Date(field.input.value) :  new Date(); //value={ inputDate } defaultValue={ inputDate }
  const inputPropsFrom = { disabled: field.disabled, name: `${field.input.name}From` };
  const inputPropsTo = { disabled: field.disabled, name: `${field.input.name}To` };

  return (
    <div className={ `form-group form-group-sm l-h p-r ${ field.inline ? '': 'row'}` }>
      <label className={ `form-control-label ${ field.inline ? '' : 'col-sm-2'}` } htmlFor={field.input.name}>{field.label}</label>
      <DateTime {...field.input} className={`form-control-sm ${ field.inline ? 'inline': ''}`} inputProps={inputPropsFrom} dateFormat="DD/MM/YYYY" timeFormat="h:mm a" />
      <DateTime {...field.input} className={`form-control-sm ${ field.inline ? 'inline': ''}`} inputProps={inputPropsTo} dateFormat="DD/MM/YYYY" timeFormat="h:mm a" />
    </div>
  );
}
