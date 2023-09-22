import Cookie from 'js-cookie'
import './index.css'

const Home = props => {
  const onCLickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="bg-container">
      <div className="top-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="image"
        />
        <button className="button" type="button" onClick={onCLickLogout}>
          Logout
        </button>
      </div>
      <h1 className="heading">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="card-img"
      />
    </div>
  )
}

export default Home
