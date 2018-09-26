import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  state = {
    showUnanswered: true
  }

    displayAnswered = () => {
    this.setState(() => ({
      showUnanswered: false
    }))
  }

  displayUnanswered = () => {
    this.setState(() => ({
      showUnanswered: true
    }))
  }

  render() {

    
   
    const { questions } = this.props;
   

    return (
     
      <div className="dashboard-page">
        <div className="dashboard-page__inner">
          
          <h1 className="app-title">Dashboard</h1>
          
          <div className="dashborad__filter">
            <button
              onClick={this.displayUnanswered}
              >
              Unanswered
            </button>
      
            <button
              onClick={this.displayAnswered}
              >
              Answered
            </button>
          </div>
          <div className="questions-container">
            {questions.filter((question) => {
                if(this.state.showUnanswered) {
                  return !question.optionOne.votes.includes(this.props.authedUser) && 
                  !question.optionTwo.votes.includes(this.props.authedUser);
                }
                return question.optionOne.votes.includes(this.props.authedUser) || 
                question.optionTwo.votes.includes(this.props.authedUser);
              })
              .map((question) => (
               
                <div className="question-item" key={question.id}>
                  
                    
                      <div className="question-item__avatar">
                        <div className="image-container">
                          <img src={question.authorAvatarURL} alt={question.authorName} width="100"/>
                        </div>
                        <h2>Created by: {question.authorName}</h2>
                      </div>
                      <div className="question-item__content">
                      <Link to={`questions/${question.id}`}>
                        <p>Would you rather 
                          <span className="question-item__option">{question.optionOne.text}</span>
                          <span className="or">OR</span>
                          <span className="question-item__option">{question.optionTwo.text}</span>?
                        </p>
                        <span className="btn-poll">View</span>
                       </Link>
                      </div>
                    
                 
                </div> 
              ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  return Object.assign({}, props, {
    authedUser,
    questions: Object.values(questions)
      .sort((a,b) => ( b.timestamp - a.timestamp ))
      .map((question) => ( Object.assign({}, question, {
        authorName: users[question.author].name,
        authorAvatarURL: users[question.author].avatarURL
      }))),
    users
  });
}

export default connect(mapStateToProps)(Dashboard);