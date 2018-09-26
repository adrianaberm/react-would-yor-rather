import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from  'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import { LoadingBar } from 'react-redux-loading';
import Leaderboard from './Leaderboard';
import AddQuestion from './AddQuestion';
import Question from './Question';
import Navigation from './Navigation';
import Login from './Login';


class App extends Component {

  componentDidMount () {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
        <LoadingBar />
          {this.props.authedUser === null
            ? (<Login />)
            :
            (
              <Fragment>
                
                <div className='main-container'>
                  <Navigation />
                  { this.props.loading === true
                    ? null
                    : <div>
                        <Route path='/' exact component={Dashboard} />
                        <Route path='/leaderboard' component={Leaderboard} />
                        <Route path='/questions/:id' exact component={Question} />
                        <Route path='/add' component={AddQuestion} />
                      </div>
                  }
                </div>
              </Fragment>
            )
          }
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);