import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import Start from './Start'
import Login from './Login'
import OrderingForm from './components/OrderingForm'
import OrderingOptions from './components/OrderingOptions'
import RecipeViewer from './components/RecipeViewer'
import ViewOrder from './components/ViewOrder'
import ModalConductor from './helpers/ModalConductor'

import './App.css';

const history = createHistory()

class App extends Component {
  constructor(){
    super()

    this.state = {
      modalStatus: '',
      modalName: '',
      modalProps: null,
    }
    this.setModal=this.setModal.bind(this)
  }

  setModal(modalStatus, modalName, modalProps) {
    if (modalStatus === 'hide') {
      this.setState({
        modalStatus: '',
        modalName: '',
        modalProps: null,
      })
    }
    else {
      this.setState({
        modalStatus: modalStatus,
        modalName: modalName,
        modalProps: modalProps,
      })
    }
  }

  onExit() {
    localStorage.removeItem('account')
    history.push('/')
  }

  render() {
    return (
      <Router history={history}>
        <div className="dashboard">
          <ModalConductor
            modalName={this.state.modalName}
            modalStatus={this.state.modalStatus}
            modalProps={this.state.modalProps}
            setModal={this.setModal}
          />
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
              setModal={this.setModal}
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
