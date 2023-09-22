import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    errmsg: '',
    showErr: false,
  }

  onChangeUsername = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errmsg => {
    this.setState({errmsg, showErr: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errmsg, showErr, userId, pin} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-login-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />
          <div className="form-con">
            <form className="form" onSubmit={this.submitForm}>
              <h1 className="heading-we">Welcome Back!</h1>
              <label htmlFor="user" className="label">
                User ID
              </label>
              <input
                type="text"
                id="user"
                placeholder="Enter User ID"
                onChange={this.onChangeUsername}
                value={userId}
                className="input"
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                className="input"
                type="password"
                id="pin"
                placeholder="Enter PIN"
                value={pin}
                onChange={this.onChangePassword}
              />
              <button className="login-button" type="submit">
                Login
              </button>
              {showErr && <p className="err">*{errmsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
