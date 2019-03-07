import React from 'react'

import ToggleButton from '../../common/ToggleButton'
import { createUser, createHousehold } from '../../services/auth/admin'

import './index.css'

class CreateAccount extends React.Component {
  constructor(){
    super()

    this.state = {
      username: '',
      password: '',
      household_name: '',
      toggle: false,
    }

    this.onPress=this.onPress.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  onPress() {
    let { username, password, household_name } = this.state
    if (username !== '' && password !== '' && household_name !== '') {
      let toggleCreateHousehold = this.state.toggle
      if (toggleCreateHousehold) {
        createHousehold(username, password, household_name).then(res => {
          if (res.data === 'OK') {
            this.props.setSnackbar('show', {
              text: 'Account and household has been created!'
            })
            this.props.history.push('/')
          }
          else this.props.setSnackbar('show', {
            text: 'An error has occurred.'
          })
        })
      }
      else {
        createUser(username, password, household_name).then(res => {
          if (res.data.length > 0) {
            this.props.setSnackbar('show', {
               text: 'Account has been created!'
             })
             this.props.history.push('/')
          }
          else {
            this.props.setSnackbar('show', {
              text: this.state.household_name + ' was not found.'
            })
          }
        })
        .catch(err => this.props.setSnackbar('show', {
          text: 'An error has occurred.'
        }))
      }
    }
  }

  handleChange(event, index) {
    let name = event.target.name
    let value = event.target.value

    this.setState({[name]: value})
  }

  render() {
    return (
      <div className="createAccount">
        <div className="createAccount-instructions">
          <div className="createAccount-instructions-image" />
          <div className="createAccount-instructions-text">
            Please make sure you dont belong to any current households before creating a new one!
          </div>
        </div>
        <div className="createAccount-inputContainer--wrapper">
          <div className="createAccount-inputContainer">
            <div className="createAccount-inputContainer-header">
              Username:
            </div>
            <div className="createAccount-inputContainer-input">
              <input
                className='default-input'
                placeholder='"Jon-Doe-Snow"'
                maxLength={15}
                name='username'
                value={this.state.username}
                onChange={this.handleChange}
                autoComplete='off'
              />
            </div>
          </div>
          <div className="createAccount-inputContainer">
            <div className="createAccount-inputContainer-header">
              Password:
            </div>
            <div className="createAccount-inputContainer-input">
              <input
                className='default-input'
                placeholder='"*******"'
                maxLength={10}
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="createAccount-separater"/>
          <div className="createAccount-inputContainer">
            <div className="createAccount-inputContainer-header">
              New Household?
            </div>
            <div className="createAccount-inputContainer-input">
              <div className="createAccount-inputContainer-toggle" onClick={() => this.setState({toggle: !this.state.toggle})}>
                <ToggleButton
                  text='hi'
                  toggle={this.state.toggle}
                />
              </div>
            </div>
          </div>
          <div className="createAccount-inputContainer">
            <div className="createAccount-inputContainer-header">
              Household name:
            </div>
            <div className="createAccount-inputContainer-input">
              <input
                className='default-input'
                placeholder='"Cool_gai_1990"'
                maxLength={15}
                name='household_name'
                value={this.state.household_name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="createAccount-inputContainer-button">
            <div className="createAccount-inputContainer-button-container" onClick={this.onPress}>
              <div className="default-button default-button--createAccount-button">
                CREATE ACCOUNT
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateAccount
