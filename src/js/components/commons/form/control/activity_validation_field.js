import React, { Component } from 'react';
import { Field } from 'redux-form';

class SimpleCheckBoxField extends Component {
  componentWillReceiveProps(nextField) {
    const { meta: { touched, error } } = nextField;
    if(touched && error)
      nextField.onError(error);
    else
      nextField.onError('');
  }

  render(field) {
    return (
      <input
        className="has-value"
        type="checkbox"
        {...this.props.input}
        disabled={this.props.disabled}
      />
    );
  }
}

function SimpleTextAreaField(field) {
  return (
    <textarea
      {...field.input}
      className="form-control"
    ></textarea>
  );
}

class ActivityValidationField extends Component {
  constructor(props) {
    super(props);
    this.state = { error: undefined };
  }

  onError(error) {
    if(error != this.state.error)
      this.setState({ error });
  }

  render() {
    const { label, checkbox, textarea } = this.props;
    const className = `form-group ${this.state.error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{ label }</label>
        <div className="input-group m-b">
          <span className="input-group-addon">
            <Field name={ checkbox } onError={ this.onError.bind(this) } component={SimpleCheckBoxField}/>
          </span>
          <Field name={textarea} component={SimpleTextAreaField}/>
        </div>
        <div className="text-help">
          {this.state.error}
        </div>
      </div>
    );
  }
}

export default ActivityValidationField;
