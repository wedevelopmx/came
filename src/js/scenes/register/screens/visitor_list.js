import React, { Component } from 'react';
import { Tabs }from 'commons/tab';
import { Crud, ModalWrapper } from 'commons/flipper';
import { VisitorCard, VisitorRegisterCard, VisitorsCard } from 'search';
import { SupportForm, SupportList } from 'support';
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
            <Crud title="Alerta" icon="warning" list={CommentList} create={CommentForm} update={CommentForm} decorator={ModalWrapper}/>
            <Crud title="Acompañamiento" icon="supervisor_account" list={SupportList} create={SupportForm} update={SupportForm} decorator={ModalWrapper}/>
            <Crud title="Salidas" icon="launch" list={Checkout} create={CheckoutForm} update={CheckoutItem} decorator={ModalWrapper}/>
          </Tabs>
        </VisitorCard>
      </div>
    </div>
  );
}
