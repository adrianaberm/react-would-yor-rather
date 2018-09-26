import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  handleLogin(id) {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(id));
  }
  render() {
    const { users } = this.props;

    return (
      <div className="login-page">
        <div className="login-page__inner">
          <h1>Login</h1>
          <h2>Choose an user:</h2>
          <div className="user-list">
          {users && users.map((user) => (
            <div className="user-list__item" key={user.id} onClick={(e) => { this.handleLogin(user.id); }}>
              <div className="user-list__avatar">
                  <img src={user.avatarURL} alt={user.name} />
              </div>
              <h3 className="user-list__name">{user.name}</h3>
            </div>
          ))}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users }, props) {
  return {
    users: Object.values(users)
  };
}


export default connect(mapStateToProps)(Login);