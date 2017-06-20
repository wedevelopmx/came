import React, { Component } from 'react';
import { Tabs }from 'commons/tab';
import { Crud, Slider, ModalWrapper, SlideWrapper } from 'commons/flipper';
import { VisitorCard, VisitorRegisterCard, VisitorsCard } from 'search';
import { SupportForm, SupportList, SupportItem } from 'support';
import { CommentForm, CommentList } from 'comments';
import { Checkout, CheckoutForm, CheckoutItem } from 'checkout';

function stayRecord() {
  return (
    <div className="p-a text-center">
      <h6>Work In Progress</h6>
    </div>
  );
}


export default function() {
  return (
    <div className="container-flex">
      <div className="col-half">
        <Crud list={VisitorsCard} create={VisitorRegisterCard} decorator={ModalWrapper} />
      </div>
      <div className="col-half">
        <VisitorCard>
          <Tabs selected="0">
            <Crud title="Acompañamiento" icon="supervisor_account" list={SupportList} create={SupportForm} update={SupportItem} decorator={ModalWrapper}/>
            <Crud title="Estancia" icon="assignment" list={stayRecord} create={stayRecord} update={stayRecord} decorator={ModalWrapper}/>
            <Crud title="Alerta" icon="warning" list={CommentList} create={CommentForm} update={CommentForm} decorator={ModalWrapper}/>
          </Tabs>
        </VisitorCard>
      </div>
    </div>
  );
}
