import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions';



export class Question extends Component {
  handleAnswer = (answer) => {
    const { dispatch, question, authedUser } = this.props;

    dispatch(handleAnswerQuestion({
      authedUser,
      qid: question.id,
      answer
    }));
  }
  render() {

    if (this.props.question === null) {
        return (
        <p className="error-page">This question does not exist.
          <a href={`/`}>Return to homepage</a>
        </p>

       ) 
    }

    const { question, authedUser } = this.props;
    const voteCountOne = question.optionOne.votes.length
    const voteCountTwo = question.optionTwo.votes.length
    const totalVotes = (question.optionOne.votes.length + question.optionTwo.votes.length)
    const barOnewidth = Number(voteCountOne/totalVotes*100).toFixed(0)
    const barTwowidth = Number(voteCountTwo/totalVotes*100).toFixed(0)
    const percentageOne = barOnewidth + '%';
    const percentageTwo = barTwowidth + '%';

    return (
      <div className="question-page">
        <div className="question-page__inner">
          <h1>Question</h1>
      
          <div className="question-detail">
            <div className="question-detail__header">
              <div class="image-container">
                <img src={question.authorAvatarURL} alt={question.authorName} width="100"/>
              </div>
              <p>Created by {question.authorName}</p>
            </div>

            <div className="question-detail__content">
              <h2>Would you rather
                <span>{question.optionOne.text}</span> or 
                <span>{question.optionTwo.text}</span> ?
              </h2>


              {this.props.question.answered ? (

                <div className="question-detail__results">
                  <div className="user-choice">
                    <p>You Chose: {question.optionOne.votes.includes(authedUser) ? (<strong>{question.optionOne.text}</strong>) : (<strong>{question.optionTwo.text}</strong>)}.</p>
                  </div>

                  <div className="options">
                    <div className="bar-container">
                     <p>{barOnewidth}%</p>
                      <div className="vote-bar" style={{width : percentageOne}}></div>
                    </div>
                    {voteCountOne} User(s) chose {question.optionOne.text}.</div>
                    <div className="option_content">
                      <div className="bar-container">
                        <p>{barTwowidth}%</p>
                        <div className="vote-bar" style={{width : percentageTwo}}></div>
                      </div>
                    {voteCountTwo} User(s) chose {question.optionTwo.text}.</div>
                  </div>
                  )
                  : (
                    <div className="option">
                      <div className="option_content">
                        <button type="button"
                          onClick={(e) => { this.handleAnswer('optionOne'); }}>{question.optionOne.text}
                        </button>
                        <button type="button" 
                          onClick={(e) => { this.handleAnswer('optionTwo'); }}>{question.optionTwo.text}
                        </button>
                      </div>
                    </div>
                  )}
            </div>         
          </div>  
          </div>
        </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  return Object.assign({}, props, {
    authedUser,
    question: question ? Object.assign({}, question, {
      authorName: users[question.author].name,
      authorAvatarURL: users[question.author].avatarURL,
      answered: (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
    }) : null,
    users
  });
}
export default withRouter(connect(mapStateToProps)(Question))

