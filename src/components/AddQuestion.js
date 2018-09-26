import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
  }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/');
    this.props.dispatch(handleAddQuestion(this.state));
  }

  render() {
    const { optionOneText, optionTwoText } = this.state;

    return (
      <div className="add-page">
        <div className="add__inner">
          <h1>Add question</h1>
          <h2>Would you rather</h2>
          
        <form className='question-form' onSubmit={this.handleSubmit}>
          
          <label htmlFor='optionOneText'>Option One</label>
          <input
            type='text'
            value={optionOneText}
            onChange={this.handleInputChange}
            name='optionOneText'
            id='optionOneText'
          />

          <label htmlFor='optionTwoText'>Option Two</label>
          <input
            type='text'
            value={optionTwoText}
            onChange={this.handleInputChange}
            name='optionTwoText'
            id='optionTwoText' 
          />

          <button className='add-btn' type='submit' disabled={!(optionOneText && optionTwoText)}>
            Add Question
          </button>
          
        </form>
      </div>
    </div>
    )
  }
}

export default connect()(AddQuestion);