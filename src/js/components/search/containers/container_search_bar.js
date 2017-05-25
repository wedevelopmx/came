import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="">
        <form className="form navbar-item p-l p-r p-t p-b">
          <div className="form-group l-h m-a-0">
            <div className="input-group input-group-sm">
              <input className="form-control p-x b-a rounded" placeholder="Search visitor..." type="text"/>
              <span className="input-group-btn">
                <button type="submit" className="btn white b-a rounded no-shadow">
                  <i className="material-icons">search</i>
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
