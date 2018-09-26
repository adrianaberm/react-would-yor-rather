import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
  
  render() {

  const {users} = this.props
  const questioAnswerTotal = (user) => {
    return user.questions.length + Object.keys(user.answers).length;
  }

  const listUsers = Object.keys(users).map(id => users[id])
    .sort((a, b) => questioAnswerTotal(b) - questioAnswerTotal(a));

  return (
    <div className="Leaderboard-page">
      <div className="Leaderboard__inner">
      <h1>Leader Board</h1>
      <h2>Meet our best players</h2>
        <div className="Leaderboard__container">
            {listUsers.map((user, index) => (
              <div className="Leaderboard__item" key={user.id}>
               
                <div className="Leaderboard__content">
                  <div className="image-container">
                    <img src={user.avatarURL}
                      alt={`Avatar of ${user.name}`}
                      className='avatar'
                    />

                  </div>
                   <h3>{user.name}</h3>
                  <div><p>Questions created: {user.questions.length}</p></div>
                  <div><p>Answers: {Object.keys(user.answers).length}</p></div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    )
      
  }

}

function mapStateToProps ({ users }) {
  return {
    users,
  }
};


export default connect(mapStateToProps)(Leaderboard);



