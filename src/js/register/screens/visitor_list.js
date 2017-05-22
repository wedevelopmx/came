import React, { Component } from 'react';

import VisitorsCard from '../containers/container_visitors_card';
import VisitorCard from '../containers/container_visitor_card';
import DoorInsight from '../containers/container_door_insight';

export default function() {
  return (
    <div className="row">
      <div className="col-sm-6">
        <VisitorsCard />
      </div>
      <div className="col-sm-6">
        <div className="box">
          <VisitorCard/>
          <DoorInsight/>
        </div>
      </div>
    </div>
  );
}
