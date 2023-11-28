import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-content-card">
      <h1 className="job-heading">Find The Job That Fits Your Life</h1>
      <p className="jobs-quote">
        Millions of People are searching for jobs, salary information, company
        reviews.Find the jobs that fits your abilities and potential.
      </p>
      <div>
        <Link to="/jobs" className="remove-underline">
          <button className="find-jobs-button" type="submit">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
