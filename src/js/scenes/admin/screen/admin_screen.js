import React, { Component } from 'react';
import { Tabs, Tab }from 'commons/tab';
import { VisitorCard, VisitorsCard } from 'search';
import { Flipper } from 'commons/flipper';
import { CommentForm, CommentList } from 'comments';

export default function() {
  return (
    <div className="container-flex">
      <div className="col-half">
        <VisitorsCard />
      </div>
      <div className="col-half">
        <VisitorCard>
          <Tabs selected="0">
            <Tab title="Alerta" icon="supervisor_account">
              <Flipper flip={CommentList} flop={CommentForm}/>
            </Tab>
            <Tab title="Acompanamiento" icon="launch">
              <h3>Acompanamiento</h3>
            </Tab>
            <Tab title="Salidas" icon="warning">
              <h3>Salidas</h3>
            </Tab>
          </Tabs>
        </VisitorCard>
      </div>
    </div>
  );
}
