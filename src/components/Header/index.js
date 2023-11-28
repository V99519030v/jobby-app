import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="web-logo-header"
          alt="website logo"
        />
      </Link>
      <ul className="large-view-container">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
        {/* <li>
          <button className="logout-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </li> */}
      </ul>
      <div className="large-view-button-card">
        <button className="logout-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <ul className="mobile-view-container">
        <li>
          <Link to="/" className="nav-link">
            <AiFillHome className="home-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            <BsFillBriefcaseFill className="job-icon" />
          </Link>
        </li>
        <li>
          <button
            className="logout-icon-button"
            type="button"
            onClick={onLogout}
          >
            <FiLogOut className="logout-icon" />
          </button>
        </li>
      </ul>
      {/* <div className="small-view-button-card">

      </div> */}
    </nav>
  )
}

export default withRouter(Header)
