import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { NavLink, withRouter } from 'react-router-dom';

class Navigation extends Component {
  handleLogout() {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
    this.props.history.push('/');
  }
  render() {
    return (
      <div className="navigation-bar">
        <div className="navigation-bar__inner">
          <ul className="navbar">
            <li>
              <NavLink to='/' exact activeClassName='active'>Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/add' exact activeClassName='active'>Add Question
              </NavLink>
            </li>
            <li>
              <NavLink to='/leaderboard'>Leaderboard
              </NavLink>
            </li>
          </ul>

          
          {this.props.authedUser && (
            <div className="navigation-bar__user">
              <p>Logged as: 
                <span>{this.props.authedUser.name}
                </span>
              </p>
              <div className="logout-btn" onClick={(e) => { this.handleLogout(); }}> Logout</div>
            </div>
          )}
         
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: authedUser ? users[authedUser]: null
  }
}

export default withRouter(connect(mapStateToProps)(Navigation));