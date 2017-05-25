import React, { Component } from 'react';
import { Tabs, Tab }from 'commons/tab';
import { VisitorCard, VisitorsCard } from 'search';
import { Flipper } from 'commons/flipper';
import { CommentForm, CommentList } from 'comments';

import FollowUpInsigth from '../containers/container_followup_insight';
import ExitInsigth from '../containers/container_exit_insight';

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
              <FollowUpInsigth></FollowUpInsigth>
            </Tab>
            <Tab title="Salidas" icon="warning">
              <ExitInsigth></ExitInsigth>
            </Tab>
          </Tabs>
        </VisitorCard>
      </div>
    </div>
  );
}
