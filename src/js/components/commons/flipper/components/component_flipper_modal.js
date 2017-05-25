import React, { Component } from 'react';

class FlipperModal extends Component {
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
    const container = this.state.enabled ? '' : 'overlay-modal';
    return (
      <div className={container}>
        <div>
          { <Widget hide={ this.next }/> }
        </div>
      </div>
    );
  }
}

export default FlipperModal;
