import React, { Component } from 'react';

import VisitorsCard from '../containers/container_visitors_card';
import VisitorCard from '../components/component_visitor_card';

export default function() {
  return (
    <div className="row">
      <div className="col-sm-6">
        <VisitorsCard />
      </div>
      <div className="col-sm-6">
        <div className="box">
          <VisitorCard/>
        </div>
      </div>
    </div>
  );
}
