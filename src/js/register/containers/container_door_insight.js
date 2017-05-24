import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentsInsight from './container_comments_insight';
import FollowUpInsigth from './container_followup_insight';
import ExitInsigth from './container_exit_insight';

class DoorInsight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    };
  }

  renderTab() {
    switch (this.state.tab) {
      case 0:
          return ( <FollowUpInsigth/> );
        break;
      case 1:
          return ( <ExitInsigth/> );
        break
      case 2:
          return ( <CommentsInsight/> );
        break;
    }
  }

  switchTab(tab) {
    this.setState({ tab });
  }

  render() {
    if(this.props.visitor == null) {
        return (<div></div>);
    }

    let tab = [{},{},{}];
    tab[this.state.tab] = { color: '#f44455', opacity: 1};

    return (
      <div className="">
        <div className="row no-gutter b-t">
          <div className="col-xs-4 b-r">
            <a className="p-a block text-center" onClick={() => this.switchTab(0)}>
              <i className="material-icons md-24 text-muted m-v-sm inline" style={ tab[0] }>supervisor_account</i>
              <span className="block small">Acompañamiento</span>
            </a>
          </div>
          <div className="col-xs-4 b-r">
            <a className="p-a block text-center" onClick={() => this.switchTab(1)}>
              <i className="material-icons md-24 text-muted m-v-sm inline" style={ tab[1] }>launch</i>
              <span className="block small">Salida</span>
            </a>
          </div>
          <div className="col-xs-4 b-r">
            <a className="p-a block text-center" onClick={() => this.switchTab(2)}>
              <i className="material-icons md-24 text-muted m-v-sm inline" style={ tab[2] }>warning</i>
              <span className="block small">Alerta</span>
            </a>
          </div>
        </div>
        { this.renderTab() }
      </div>
    );
  }
}

export default connect((state) => {
  return {
    visitor: state.activeVisitor
  };
}, null)(DoorInsight);
