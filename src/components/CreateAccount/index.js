import React from 'react'

import './index.css'

class CreateAccount extends React.Component {
  constructor(){
    super()

    this.state = {
      username: '',
      password: '',
    }

    this.onPress=this.onPress.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  onPress() {

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
              Household:
            </div>
            <div className="createAccount-inputContainer-input">
              <input
                className='default-input'
                placeholder='"Cool_gai_1990"'
                maxLength={15}
                name='household'
                value={this.state.household}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateAccount
