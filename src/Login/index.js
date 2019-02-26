import React from 'react'

import { login } from '../services/auth/login'

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
    if (localStorage.getItem('user')) {
      this.props.history.push('start')
    }
  }

  onPress() {
    login(this.state.username, this.state.password)
    .then(res => {
      let userCredentials = {
        userId: res.userDetails.id,
        token: res.token
      }
      localStorage.setItem('user', JSON.stringify(userCredentials))
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
        <div className="login-mainWrapper">
          <div className="login-mainWrapper-inputContainer">
            <input
              className='default-input'
              placeholder='Username'
              maxLength={10}
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              autoComplete='off'
            />
            <input
              className='default-input'
              placeholder='Password'
              maxLength={10}
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="login-mainWrapper-button" onClick={this.onPress}/>
        </div>
        <div className="login-createAccount">
          <div className="login-createAccount-button" onClick={() => this.props.history.push('/createAccount')}>
            Create account here!
          </div>
        </div>
      </div>
    )
  }
}

export default Login
