import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { activeModal: false, activeItem: undefined };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  hideModal() {
    this.setState({
      activeModal: false,
      activeItem: undefined
    });
  }

  showModal(item) {
    this.setState({
      activeModal: true,
      activeItem: item
    });
  }

  renderView() {
    const { create : ComponentForm, update : ComponentUpdate, list : ComponentList } = this.props;
    // Modal is active
    if(this.state.activeModal) {
      // There is an item to be displayed
      if(this.state.activeItem) {
        return ( <ComponentUpdate key="1" onComplete={ this.hideModal } activeItem={ this.state.activeItem } />);
      } else {
        // There is not initial item
        return ( <ComponentForm key="2" onComplete={ this.hideModal } />);
      }
    } else {
      return (<ComponentList key="3" onCreate={ this.showModal } onUpdate={ this.showModal }/>);
    }
  }

  render() {
    const { decorator: Decorator } = this.props;

    return (
      <Decorator>
        { this.renderView() }
      </Decorator>
    );
  }
}

export default Slider;
