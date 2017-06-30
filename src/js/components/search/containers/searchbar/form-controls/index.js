import React, { Component } from 'react';

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
    <div className="form-group row l-h">
      <label className="col-sm-2 form-control-label">{field.label}</label>
      <div className="col-sm-10">
        <select className="form-control form-control-sm input-c" {...field.input}>
          { selectOptionsHelper(field.options) }
        </select>
      </div>
    </div>
  );
}
