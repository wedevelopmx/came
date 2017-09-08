import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { default as UserItem } from './container_user_item';
import { fetchUsers } from '../actions';

class UserList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="box m-t">
        <table className="table table-strip">
          <thead>
            <tr>
              <th>Correo</th>
              <th>Usuario</th>
              <th>Voluntario</th>
              <th>Administrador</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.renderUsers() }
          </tbody>
        </table>
      </div>
    );
  }

  renderUsers() {
    return _.map(this.props.users, (user) => {
      return (
        <UserItem key={user._id} user={user}/>
      );
    });
  }
}

export default connect((state) => {
  return {
    users: state.users
  };
}, { fetchUsers })(UserList);
