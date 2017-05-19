import React, { Component } from 'react';
import $ from 'jquery';
import datepicker from 'bootstrap-datepicker';

class DatepickerInput extends Component {
  componentDidMount() {
    $(this.refs.datepicker).datepicker();
  }

  render() {
    return (
      <input
        ref="datepicker"
        className="form-control"
        type="text"
        placeholder="yyyy-MM-dd"
        data-date-format="yyyy-MM-dd"
        data-min-date="01/01/1917"
        data-max-date="today"
        data-autoclose="1"
        bs-datepicker
        { ...this.props.fieldInput }
      />
    );
  }
}

export default DatepickerInput;
