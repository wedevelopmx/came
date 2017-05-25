import React, { Component } from 'react';
import { Tabs, Tab }from 'commons/tab';
import { VisitorCard, VisitorsCard } from 'search';

import CommentsInsight from '../containers/container_comments_insight';
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
          <Tabs selected="1">
            <Tab title="Alerta" icon="supervisor_account">
              <FollowUpInsigth></FollowUpInsigth>
            </Tab>
            <Tab title="Acompanamiento" icon="launch">
              <ExitInsigth></ExitInsigth>
            </Tab>
            <Tab title="Salidas" icon="warning">
              <CommentsInsight></CommentsInsight>
            </Tab>
          </Tabs>
        </VisitorCard>
      </div>
    </div>
  );
}
