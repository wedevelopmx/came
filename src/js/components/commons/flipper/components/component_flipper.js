import React, { Component } from 'react';

class Flipper extends Component {
  constructor(props) {
    super(props);
    this.state = { enabled: true };
    this.next = this.next.bind(this);
  }

  next() {
    this.setState({
      enabled: !this.state.enabled
    });
  }

  render() {
    const Widget = this.state.enabled ? this.props.flip : this.props.flop;
    return (
      <div>{ <Widget hide={ this.next }/> }</div>
    );
  }
}

export default Flipper;
