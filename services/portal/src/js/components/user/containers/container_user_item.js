import React, { Component } from 'react';
import { connect } from 'react-redux';
import { default as UserForm } from './container_user_form';
import { updateUser, deleteUser, updateRole, setActiveUser } from '../actions';

class UserItem extends Component {
  render() {
    const { handleSubmit, user } = this.props;
    return (
      <tr>
        <td>{ user.local.email }</td>
        <td className="text-center">
          <i className="material-icons" onClick={ () => this.handleRole('USER')  }>{ this.hasRole(user.roles, 'USER') ? 'check' : 'clear' }</i>
        </td>
        <td className="text-center">
          <i className="material-icons" onClick={ () => this.handleRole('VOLUNTEER')  }>{ this.hasRole(user.roles, 'VOLUNTEER') ? 'check' : 'clear' }</i>
        </td>
        <td className="text-center">
          <i className="material-icons" onClick={ () => this.handleRole('ADMIN')  }>{ this.hasRole(user.roles, 'ADMIN') ? 'check' : 'clear' }</i>
        </td>
        <td>
          { this.renderActionBar() }
        </td>
      </tr>
    );
  }

  renderActionBar() {
    const { user, activeUser } = this.props;
    if(activeUser && user._id == activeUser._id) {
      return ( <UserForm user={user} />);
    } else {
      return (
        <div className="btn-group">
          <button className="btn btn-sm btn-icon btn-rounded" onClick={ () => this.props.setActiveUser(user) } ><i className="material-icons">edit</i></button>
          <button className="btn btn-sm btn-icon btn-rounded" onClick={ () => this.props.deleteUser(user) } ><i className="material-icons">close</i></button>
        </div>
      );
    }
  }

  hasRole(roles, role) {
    return roles.some( currentRole => currentRole == role );
  }

  handleRole(role) {
    this.props.updateRole(this.props.user._id, role);
    this.forceUpdate();
  }
}

export default connect(
  state => ({
    activeUser: state.activeUser
  }),
  { updateUser, deleteUser, updateRole, setActiveUser })(UserItem);
