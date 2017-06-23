import React, { Component } from 'react';
import { Tabs }from 'commons/tab';
import { Crud, Slider, ModalWrapper, SlideWrapper } from 'commons/flipper';
import { VisitorCard, VisitorRegisterCard, VisitorsCard } from 'search';
import { AppointmentCheckoutList, AppointmentCheckout } from 'appointment';
import { CommentForm, CommentList } from 'comments';
import { Checkout, CheckoutForm, CheckoutItem } from 'checkout';

export default function() {
  return (
    <div className="container-flex">
      <div className="col-half">
        <Crud list={VisitorsCard} create={VisitorRegisterCard} decorator={ModalWrapper} />
      </div>
      <div className="col-half">
        <VisitorCard>
          <Tabs selected="0">
            <Crud title="Salidas" icon="launch" list={Checkout} create={CheckoutForm} update={CheckoutItem} decorator={ModalWrapper}/>
            <Crud title="Acompañamiento" icon="supervisor_account" list={AppointmentCheckoutList} update={AppointmentCheckout} decorator={ModalWrapper}/>
            <Crud title="Alerta" icon="warning" list={CommentList} create={CommentForm} update={CommentForm} decorator={ModalWrapper}/>
          </Tabs>
        </VisitorCard>
      </div>
    </div>
  );
}
