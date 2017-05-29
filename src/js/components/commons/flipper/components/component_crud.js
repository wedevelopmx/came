import React, { Component } from 'react';

// <Crud list={ComponentList} create={ComponentForm} update={ComponentUpdate}/>

class CrudComponent extends Component {
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

  renderModal() {
    const { create : ComponentForm, update : ComponentUpdate, decorator: Decorator } = this.props;
    // Modal is active
    if(this.state.activeModal) {
      // There is an item to be displayed
      if(this.state.activeItem) {
        return (
          <Decorator>
            <ComponentUpdate onComplete={ this.hideModal } activeItem={ this.state.activeItem } />
          </Decorator>
        );
      } else {
        // There is not initial item
        return (
          <Decorator>
            <ComponentForm onComplete={ this.hideModal } />
          </Decorator>
        );
      }
    }

    return ( <div></div> );
  }

  render() {
    const { list : ComponentList } = this.props;

    return (
      <div className="wrapper">
          <ComponentList onCreate={ this.showModal } onUpdate={ this.showModal }/>
            { this.renderModal() }
      </div>
    );
  }
}

export default CrudComponent;
