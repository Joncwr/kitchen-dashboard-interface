import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import Start from './Start'
import Ordering from './components/Ordering'
import RecipeViewer from './components/RecipeViewer'

import './App.css';

const history = createHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="dashboard">
          <div className="homeButton" onClick={() => history.push('/')}/>
          <Route exact path="/" render={() => (
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
