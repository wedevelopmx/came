import React, { Component } from 'react';

class Assistance extends Component {
  render() {
    return (
      <div className="box">
        <div className="box-header">
          <h3>Who to follow</h3>
        </div>
        <div className="box-divider m-a-0"></div>
        <ul className="list no-border p-b">
          <li className="list-item">
            <a herf="" className="list-left">
            	<span className="w-40 avatar">
                <img src="./images/profile.png" alt="..."/>
                <i className="on b-white bottom"></i>
              </span>
            </a>
            <div className="list-body">
              <div><a href="">Chris Fox</a></div>
              <small className="text-muted text-ellipsis">Designer, Blogger</small>
            </div>
          </li>
          <li className="list-item">
            <a herf="" className="list-left">
            	<span className="w-40 circle green avatar">P<i className="away b-white bottom"></i></span>
            </a>
            <div className="list-body">
              <div><a href="">Peter</a></div>
              <small className="text-muted text-ellipsis">Musician, Player</small>
            </div>
          </li>
        </ul>
        <div className="box-footer">
          <a onClick={ this.props.hide } className="btn btn-sm btn-block info text-u-c">Nuevo</a>
        </div>
    </div>
    );
  }
}

export default Assistance;
