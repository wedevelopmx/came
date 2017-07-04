import React, { Component } from 'react';

function Nav(props) {
  return (
    <div className="form-group row">
      <div className="col-sm-12">
        <div className="pull-right">
          <button onClick={ () => props.onBack() } className="btn btn-fw white m-r">{ props.back }</button>
          <button type="submit" className="btn btn-fw info">Siguiente</button>
        </div>
      </div>
    </div>
  );
}

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.selected || 0 };
  }

  next() {
    if(this.props.children.length != this.state.selected + 1)
      this.setState({ selected: this.state.selected + 1 });
  }

  back() {
    if(this.state.selected != 0)
      this.setState({ selected: this.state.selected - 1 });
  }

  renderBar() {
    const column = 'col-xs-' + 12 / (this.props.children.length);
    const _self = this;

    return this.props.children.map((child, index) => {
      const active = index == this.state.selected ? 'active' : '';
      return (
        <div key={index} className={`${column} b-r ${active}`}>
          <a className="p-a block text-center" onClick={() => _self.switchTab(index)}>
            <span className="block small">{ child.props.label }</span>
          </a>
        </div>
      );
    });
  }

  render() {
    const onBack = this.state.selected == 0 ? this.props.onCancel : this.back.bind(this);
    const backButtonText = this.state.selected == 0 ? 'Cancel' : 'Back';
    const component = React.cloneElement(this.props.children[this.state.selected], {
        onSubmit: (this.props.children.length == this.state.selected + 1) ? this.props.onSubmit : this.next.bind(this)
      }, <Nav onBack={onBack} back={backButtonText}/>);

    return (
      <div className="tab">
        <div className="row no-gutter b-t tab-nav">
          { this.renderBar() }
        </div>
        <div className="b-t">
          <div className="box-body">
            { component }
          </div>
        </div>
      </div>
    );
  }
}

export default WizardForm;
