import React, { Component } from 'react';
import { Crud, ModalWrapper } from 'commons/flipper';
import CategorySelection from './container_category_selection';
import CategoryEntities from './container_category_entities';
import CategoryEntityForm from './container_category_entity_form';

export default function() {
  return (
    <div className="box">
      <div className="box-header">
        <h3>Catalogos</h3>
        <small>Estos son los catalogos disponibles para tu aplicacion.</small>
      </div>
      <div className="box-body">
        <CategorySelection/>
        <Crud list={CategoryEntities} create={CategoryEntityForm} update={CategoryEntityForm} decorator={ModalWrapper}/>
      </div>
    </div>
  );
}
