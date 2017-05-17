import React, { Component } from 'react';

class WebCamera extends Component {
  render() {
    return (
      <div className="item">
        <div className="item-bg blue">
        </div>
        <div className="p-a-lg pos-rlt text-center" ng-show="camera == 1">
          <span className="img-circle white circle-icon" ng-click="prepareCamera()">
            <i className="material-icons md-48 text-blue">&#xe8fc;</i>
          </span>
          <span className="p-t text-muted text-white block">Presiona para activar camara</span>
        </div>
        <div className="pos-rlt text-center black" ng-show="camera == 2">
          <div id="camera" className="camera"></div>
          <a className="btn-float md-btn md-raised md-fab md-mini m-r pos-rlt pull-right red" ng-click="takePicture()">
            <i className="material-icons md-24">&#xe145;</i>
          </a>
        </div>
        <div className="p-a-md pos-rlt text-center" ng-show="camera == 3">
          <img ng-src="{{visitor.pictureDataURI}}" className="img-circle w-128"/>
        </div>
      </div>
    );
  }
}

export default WebCamera;
