import React, { Component } from 'react';
import VisitorCardProfile from '../containers/container_visitor_card_profile';
import { Tabs, Tab }from 'commons/tab';
import CommentsInsight from '../containers/container_comments_insight';
import FollowUpInsigth from '../containers/container_followup_insight';
import ExitInsigth from '../containers/container_exit_insight';


class VisitorCard extends Component {
  render() {
    return (
      <div className="box widget">
        <VisitorCardProfile>
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
        </VisitorCardProfile>
      </div>
    );
  }
}

export default VisitorCard;
