import React, { Component } from 'react';

import VisitorsCard from '../../search/containers/container_visitors_card';

export default function() {
  return (
    <div className="container-flex">
      <div className="col-half">
        <VisitorsCard />
      </div>
      <div className="col-half">

      </div>
    </div>
  );
}
