import React from 'react'

import Auth from '../services/Auth.js'

import './index.css'

class Login extends React.Component {
  constructor(){
    super()

    this.state = {
      username: '',
      password: '',
    }
    this.onPress=this.onPress.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('account')) {
      this.props.history.push('start')
    }
  }

  onPress() {
    Auth.authorizeUser(this.state.username, this.state.password)
    .then(res => {
      let account = {
        username: this.state.username,
        password: this.state.password
      }
      localStorage.setItem('account', JSON.stringify(account))
      this.props.history.push('start')
    })
    .catch(err => console.log(err))

  }

  handleChange(event, index) {
    let name = event.target.name
    let value = event.target.value

    this.setState({[name]: value})
  }

  render() {
    return (
      <div className="login">
        <div className="login-inputContainer">
          <input
            className="login-inputContainer-input"
            placeholder='Username'
            maxLength={10}
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            className="login-inputContainer-input"
            placeholder='Password'
            maxLength={10}
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div className="login-button" onClick={this.onPress}/>
      </div>
    )
  }
}

export default Login
