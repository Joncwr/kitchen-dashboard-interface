import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import Start from './Start'
import Login from './Login'
import Ordering from './components/Ordering'
import RecipeViewer from './components/RecipeViewer'

import './App.css';

const history = createHistory()

class App extends Component {
  onExit() {
    localStorage.removeItem('account')
    history.push('/')
  }

  render() {
    return (
      <Router history={history}>
        <div className="dashboard">
          <div className="homeButton" onClick={() => history.push('/')}/>
          <div className="exitButton" onClick={() => this.onExit()}/>
          <Route exact path="/" render={() => (
            <Login
              history={history}
            />
          )} />
          <Route exact path="/start" render={() => (
            <Start
              history={history}
            />
          )} />
          <Route exact path="/ordering" render={() => (
            <Ordering
              history={history}
            />
          )} />
          <Route exact path="/recipeviewer" render={() => (
            <RecipeViewer
              history={history}
            />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
