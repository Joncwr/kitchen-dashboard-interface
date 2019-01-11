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
import Snackbar from './helpers/Snackbar'

import './App.css';

const history = createHistory()
let snackbarTimer

class App extends Component {
  constructor(){
    super()

    this.state = {
      modalStatus: '',
      modalName: '',
      modalProps: null,
      snackbarStatus: '',
      snackbarProps: {},
    }
    this.setModal=this.setModal.bind(this)
    this.setSnackbar=this.setSnackbar.bind(this)
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

  setSnackbar(snackbarStatus, snackbarProps) {
    if (snackbarStatus === 'show') {
      clearTimeout(snackbarTimer)
      this.setState({snackbarStatus: 'hide'},() => {
        let animationDuration = 3000
        if (snackbarProps) {
          if (snackbarProps.duration) animationDuration = snackbarProps.duration
        }
        this.setState({snackbarStatus: 'show', snackbarProps: snackbarProps ? snackbarProps : {}},() => {
          snackbarTimer = setTimeout(() => {
            this.setState({snackbarStatus: 'hide'})
          }, animationDuration)
        })
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
          <Snackbar
            snackbarStatus={this.state.snackbarStatus}
            snackbarProps={this.state.snackbarProps}
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
              setSnackbar={this.setSnackbar}
            />
          )} />
          <Route exact path="/vieworder" render={() => (
            <ViewOrder
              history={history}
              setSnackbar={this.setSnackbar}
            />
          )} />
          <Route exact path="/orderingform" render={() => (
            <OrderingForm
              history={history}
              setModal={this.setModal}
              setSnackbar={this.setSnackbar}
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
