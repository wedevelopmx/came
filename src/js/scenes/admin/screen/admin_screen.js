import React, { Component } from 'react';
import { Tabs, Tab }from 'commons/tab';
import { VisitorCard, VisitorsCard } from 'search';
import { Flipper } from 'commons/flipper';
import { CommentForm, CommentList } from 'comments';
import { Assistance, AssistanceForm } from 'assistance';

export default function() {
  return (
    <div className="container-flex">
      <div className="col-half">
        <VisitorsCard />
      </div>
      <div className="col-half">
        <VisitorCard>
          <Tabs selected="0">
            <Tab title="Acompanamiento" icon="supervisor_account">
              <Flipper flip={Assistance} flop={AssistanceForm}/>
            </Tab>
            <Tab title="Alerta" icon="warning">
              <Flipper flip={CommentList} flop={CommentForm}/>
            </Tab>
            <Tab title="Salidas" icon="launch">
              <h3>Salidas</h3>
            </Tab>
          </Tabs>
        </VisitorCard>
      </div>
    </div>
  );
}
