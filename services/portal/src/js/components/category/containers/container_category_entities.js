import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoryEntities } from '../actions';

class CategoryEntities extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.category && nextProps.category.id !== this.props.category.id) {
      this.props.fetchCategoryEntities(nextProps.category.id);
    }
  }

  renderEntities() {
    return _.map(this.props.category.entries, entity => {
      return (
        <tr key={entity.name}>
          <td><label className="ui-check m-a-0"><input name="post[]" type="checkbox"/><i className="dark-white"></i></label></td>
          <td>{ entity.name }</td>
          <td>{ entity.description }</td>
          <td><a onClick={ () => this.props.onUpdate(entity) } className="btn btn-xs btn-icon blue"><i className="material-icons">edit</i></a></td>
        </tr>
      );
    });
  }

  enableEntryForm() {
    this.props.onCreate();
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped b-t">
          <thead>
            <tr>
              <th>
                <label className="ui-check m-a-0">
                  <input type="checkbox"/><i></i>
                </label>
              </th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.renderEntities() }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">
                <a onClick={ this.enableEntryForm.bind(this) } className="btn btn-sm btn-block info text-u-c">Nueva Entrada</a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    category: state.category
  };
}, { fetchCategoryEntities })(CategoryEntities);
