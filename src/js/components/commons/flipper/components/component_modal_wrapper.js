import React , { Component } from 'react';

export default class ModalWrapper extends Component {
  render() {
    return (
      <div className="overlay-modal">
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}
