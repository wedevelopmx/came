import React, { Component } from 'react';
import VisitorCardProfile from '../containers/container_visitor_card_profile';
import DoorInsight from '../containers/container_door_insight';

class VisitorCard extends Component {
  render() {
    return (
      <div>
        <VisitorCardProfile>
          <DoorInsight/>
        </VisitorCardProfile>
      </div>
    );
  }
}

export default VisitorCard;