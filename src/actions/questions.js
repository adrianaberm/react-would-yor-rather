import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion ({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading())
    return saveQuestion({
    
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then((question) => dispatch(addQuestion(question)))
      .then(dispatch(hideLoading()))
  }
}

function answerQuestion({qid, authedUser, answer}) {
  return {
    type: SAVE_QUESTION_ANSWER,
    qid,
    authedUser,
    answer,
  }
}


export function handleAnswerQuestion(info) {


   return (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer(info)
      .then(() => {
        dispatch(answerQuestion(info))
      })
      .then(() => dispatch(hideLoading()));
  };
}




