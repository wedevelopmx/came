import React, { Component } from 'react';

import VisitorsCard from 'search/containers/container_visitors_card';
import VisitorCard from '../components/component_visitor_card';

export default function() {
  return (
    <div className="container-flex">
      <div className="col-half">
        <VisitorsCard />
      </div>
      <div className="col-half">
        <VisitorCard/>
      </div>
    </div>
  );
}
