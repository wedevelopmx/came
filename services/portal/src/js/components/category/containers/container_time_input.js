import React, { Component } from 'react';

function toMilliseconds(hours, minutes) {
  return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}


export default class TimeInput extends Component {
  constructor(props) {
    super(props);
    this.state = { hours: 0, minutes: 0, date: new Date() };
  }

  componentWillReceiveProps(nextProps) {
    const { input: { value } } = nextProps;
    const date = new Date(parseInt(value));
    this.setState({
      date,
      minutes: date.getUTCMinutes(),
      hours: date.getUTCHours()
    });
  }

  update(event) {
    const { input : { onChange } } = this.props;
    const type = event.target.getAttribute('id');
    const value = event.target.value;
    switch (type) {
      case 'minutes':
        onChange(toMilliseconds(this.state.hours, value));
        break;
      case 'hours':
        onChange(toMilliseconds(value, this.state.minutes));
        break;
    }
  }

  render() {
    return (
      <div className="form-group row">
        <label for="hours" className="col-sm-1 form-control-label">Horas</label>
        <div className="col-sm-5">
          <input className="form-control" value={this.state.hours} id="hours" type="number" onChange={this.update.bind(this)}/>
        </div>
        <label for="minutes" className="col-sm-1 form-control-label">Minutos</label>
        <div className="col-sm-5">
          <input className="form-control" value={this.state.minutes} id="minutes" type="number" onChange={this.update.bind(this)}/>
        </div>
      </div>
    )
  }
}
