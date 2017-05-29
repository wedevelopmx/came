import React, { Component } from 'react';
import { Tabs, Tab }from 'commons/tab';
import { Crud, ModalWrapper } from 'commons/flipper';
import { VisitorCard, VisitorRegisterCard, VisitorsCard } from 'search';
import { CommentForm, CommentList } from 'comments';
import { Checkout, CheckoutForm, CheckoutItem } from 'checkout';

import FollowUpInsigth from '../containers/container_followup_insight';

export default function() {
  return (
    <div className="container-flex">
      <div className="col-half">
        <Crud list={VisitorsCard} create={VisitorRegisterCard} decorator={ModalWrapper} />
      </div>
      <div className="col-half">
        <VisitorCard>
          <Tabs selected="0">
            <Tab title="Alerta" icon="warning">
              <Crud list={CommentList} create={CommentForm} update={CommentForm} decorator={ModalWrapper}/>
            </Tab>
            <Tab title="Acompanamiento" icon="supervisor_account">
              <FollowUpInsigth></FollowUpInsigth>
            </Tab>
            <Tab title="Salidas" icon="launch">
              <Crud list={Checkout} create={CheckoutForm} update={CheckoutItem} decorator={ModalWrapper}/>
            </Tab>
          </Tabs>
        </VisitorCard>
      </div>
    </div>
  );
}
