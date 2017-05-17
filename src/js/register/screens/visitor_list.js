import React, { Component } from 'react';

import VisitorsCard from '../containers/container_visitors_card';
import VisitorCard from '../containers/container_visitor_card';

export default function() {
  return (
    <div className="row">
      <div className="col-sm-6">
        <VisitorsCard />
      </div>
      <div className="col-sm-6">
        <VisitorCard/>
      </div>
    </div>
  );
}
