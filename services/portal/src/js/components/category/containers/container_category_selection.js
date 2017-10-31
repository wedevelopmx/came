import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, selectCategory } from '../actions';

class CategorySelection extends Component {
  componentDidMount() {
    this.props.fetchCategories(false);
  }

  renderOptions() {
    return _.map(this.props.categories, category => {
      return (<option key={category.id} value={category.id}>{ category.name }</option>);
    });
  }

  updateSelection(event) {
    this.props.selectCategory(this.props.categories[event.currentTarget.value]);
  }

  render() {
    return (
      <form className="form navbar-item p-l p-r p-t p-b">
        <div className="form-group l-h m-a-0">
          <div className="form-group row">
            <label className="col-sm-2 form-control-label">Category</label>
            <div className="col-sm-10">
              <select className="form-control p-x b-a" onChange={ this.updateSelection.bind(this) }>
                { this.renderOptions() }
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default connect((state) => {
  return {
    categories: state.categories
  };
}, { fetchCategories, selectCategory })(CategorySelection);
