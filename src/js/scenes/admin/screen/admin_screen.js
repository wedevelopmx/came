import React, { Component } from 'react';

import VisitorsCard from 'search/containers/container_visitors_card';
import { Tabs, Tab }from 'commons/tab';

export default function() {
  return (
    <div className="container-flex">
      <div className="col-half">
        <VisitorsCard />
      </div>
      <div className="col-half">
        <div className="box">
          <Tabs selected="1">
            <Tab title="Alerta" icon="supervisor_account">
              <h3>One</h3>
            </Tab>
            <Tab title="Acompanamiento" icon="launch">
              <h3>Two</h3>
            </Tab>
            <Tab title="Salidas" icon="warning">
              <h3>Three</h3>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
