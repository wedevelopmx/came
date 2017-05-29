import React, { Component } from 'react';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }

  switchTab(index) {
    this.setState({ selected: index });
  }

  renderBar() {
    const column = 'col-xs-' + 12 / (this.props.children.length);
    const _self = this;

    return this.props.children.map((child, index) => {
      return (
        <div key={index} className={`${column} b-r`}>
          <a className="p-a block text-center" onClick={() => _self.switchTab(index)}>
            <i className="material-icons md-24 text-muted m-v-sm inline">{ child.props.icon }</i>
            <span className="block small">{ child.props.title }</span>
          </a>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="fix expanse">
        <div className="fit b-t b-b">
          { this.renderBar() }
        </div>
        <div className="fix scrollable">
          { this.props.children[this.state.selected] }
        </div>
      </div>

    );
  }
}

export default Tabs;
