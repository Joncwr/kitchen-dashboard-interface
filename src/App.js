import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import Start from './Start'
import Login from './Login'
import OrderingForm from './components/OrderingForm'
import OrderingOptions from './components/OrderingOptions'
import RecipeViewer from './components/RecipeViewer'
import ViewOrder from './components/ViewOrder'

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
          <Route exact path="/orderingoptions" render={() => (
            <OrderingOptions
              history={history}
            />
          )} />
          <Route exact path="/vieworder" render={() => (
            <ViewOrder
              history={history}
            />
          )} />
          <Route exact path="/orderingform" render={() => (
            <OrderingForm
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
