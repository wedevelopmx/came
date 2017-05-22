import React, { Component } from 'react';

class FollowUpInsigth extends Component {
  render() {
    return (
      <div className="box-body b-t">
		  	<div className="streamline b-l m-b m-l">
              <div className="sl-item">
                <div className="sl-left">
                  <img src="./images/profile.png" className="img-circle"/>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Louis Elliott</a><span className="m-l-sm sl-date">5 min ago</span>
                  <div>assign you a task <a href="" className="text-info">Mockup Design</a>.</div>
                </div>
              </div>
              <div className="sl-item">
                <div className="sl-left">
                  <img src="./images/profile.png" className="img-circle"/>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Terry Moore</a><span className="m-l-sm sl-date">10 min ago</span>
                  <div>Follow up to close deal</div>
                </div>
              </div>
              <div className="sl-item">
                <div className="sl-left">
                  <img src="./images/profile.png" className="img-circle"/>
                </div>
                <div className="sl-content">
                  <a href="" className="text-info">Walter Paler</a><span className="m-l-sm sl-date">1 hour ago</span>
                  <div>was added to Repo</div>
                </div>
              </div>
            </div>
            <a href="" className="btn btn-sm success text-u-c m-y-sm">Load More</a>
  		</div>
    );
  }
}

export default FollowUpInsigth;
