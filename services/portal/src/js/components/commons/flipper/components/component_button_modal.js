import React, { Component } from 'react';
import { ModalWrapper } from 'commons/flipper';

class ButtonModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  render() {
    if(this.state.modal) {
      const Element = this.props.component;
      return (
        <ModalWrapper>
          <Element reference={this.props.reference} onClose={ this.onClose.bind(this) } />
        </ModalWrapper>
      );
    } else {
      return (
        <a className={ this.props.className } onClick={ this.onClick.bind(this) }>{ this.props.text }</a>
      );
    }
  }

  onClick() {
    this.setState({ modal: true });
  }

  onClose() {
    this.setState({ modal: false });
  }
}

export default ButtonModal;
