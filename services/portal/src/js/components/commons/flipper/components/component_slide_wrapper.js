import React , { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

export default class SlideWrapper extends Component {
  render() {
    console.log('Slide')
    return (
      <div className="slide-wrapper">
        <CSSTransitionGroup
          transitionName="slide"
          transitionEnterTimeout={1500}
          transitionLeaveTimeout={1300}>
          { this.props.children }
        </CSSTransitionGroup>
      </div>
    );
  }
}
