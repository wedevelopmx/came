import React, { Component } from 'react';
import { Tabs, Tab }from 'commons/tab';
import { VisitorCard, VisitorsCard } from 'search';
import { Flipper } from 'commons/flipper';
import { CommentForm, CommentList } from 'comments';
import { Assistance, AssistanceForm } from 'assistance';

import {CategoryCard} from 'category';

export default function() {
  return (
    <div className="container-flex">
      <div className="col-half">
        <CategoryCard/>
      </div>
      <div className="col-half">

      </div>
    </div>
  );
}
