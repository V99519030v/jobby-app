/* eslint-disable import/extensions */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

import FilterGroup from '../FilterGroup'
import AllJobs from '../AllJobs'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

// class defining
class Jobs extends Component {
  state = {
    authorProfile: {},
    jobsList: [],
    employmentType: [],
    minimumPackage: '',
    searchInput: '',
    profileApiStatus: apiStatusConstants.initial,
    jobApiStatus: apiStatusConstants.initial,
  }

  // initial request to profile and jobs api
  componentDidMount() {
    this.getProfile()
    this.getJobsProfiles()
  }

  // on profile success adding values to the authorProfileObject
  onProfileSuccess = profile => {
    const profileUpdate = {
      name: profile.name,
      profileImageUrl: profile.profile_image_url,
      shortBio: profile.short_bio,
    }
    this.setState({
      authorProfile: profileUpdate,
      profileApiStatus: apiStatusConstants.success,
    })
  }

  // profile api request
  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const profileResponse = await fetch(profileUrl, options)
    if (profileResponse.ok === true) {
      const profileData = await profileResponse.json()
      this.onProfileSuccess(profileData.profile_details)
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  // on success of jobs
  onSuccessOfJobs = jobs => {
    const jobsUpdate = jobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))

    this.setState({
      jobsList: jobsUpdate,
      jobApiStatus: apiStatusConstants.success,
    })
  }

  // requesting apis
  getJobsProfiles = async () => {
    const {employmentType, minimumPackage, searchInput} = this.state
    this.setState({jobApiStatus: apiStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const addEmploymentType = employmentType.join(',')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${addEmploymentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const jobsResponse = await fetch(jobsUrl, options)
    if (jobsResponse.ok === true) {
      const jobsData = await jobsResponse.json()
      this.onSuccessOfJobs(jobsData.jobs)
    } else {
      this.setState({jobApiStatus: apiStatusConstants.failure})
    }
  }

  // onchange of serach input
  onChangeOfSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  // on search Button

  onSearchButton = () => {
    this.getJobsProfiles()
  }

  // on employment click
  onClickOfEmployment = (employId, event) => {
    const {employmentType} = this.state
    const isChecked = event.target.checked
    let updateEmploymentIdList = employmentType
    if (isChecked) {
      this.setState(
        {employmentType: [...updateEmploymentIdList, employId]},
        this.getJobsProfiles,
      )
    } else {
      updateEmploymentIdList = employmentType.filter(
        eachItem => eachItem !== employId,
      )
      this.setState(
        {employmentType: [...updateEmploymentIdList]},
        this.getJobsProfiles,
      )
    }
  }

  // on minimum package click
  onClickOfMinimumPackage = packageRange => {
    this.setState({minimumPackage: packageRange}, this.getJobsProfiles)
  }

  retryButton = (callApi, jobsCSS = '') => (
    <button
      className={`retry-button ${jobsCSS}`}
      type="button"
      onClick={callApi}
    >
      Retry
    </button>
  )

  // author profile card
  getProfileCard = () => {
    const {authorProfile} = this.state
    const {name, profileImageUrl, shortBio} = authorProfile
    return (
      <div className="profile-card">
        <img src={profileImageUrl} className="profile-image" alt="profile" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  // author profile failure button card
  getAuthorFailure = () => (
    <div className="author-failure-button-card">
      {this.retryButton(this.getProfile)}
    </div>
  )

  // accessing all job items if items present else showing no jobs image.

  getAllJobs = () => {
    const {jobsList} = this.state
    if (jobsList.length > 0) {
      return (
        <ul className="all-jobs-card">
          {jobsList.map(eachItem => (
            <AllJobs key={eachItem.id} jobsObject={eachItem} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-jobs-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-image"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-msg">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  // on failure of api request.
  getFailure = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for
      </p>
      <div>{this.retryButton(this.getJobsProfiles, 'jobs-retry-button')}</div>
    </div>
  )

  // load Loader while fetching data
  loadLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  // switch-statement for profile

  callAuthorProfile = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.getProfileCard()
      case apiStatusConstants.failure:
        return this.getAuthorFailure()
      case apiStatusConstants.progress:
        return this.loadLoader()
      default:
        return null
    }
  }

  // get jobs based api status
  getJobs = () => {
    const {jobApiStatus} = this.state
    switch (jobApiStatus) {
      case apiStatusConstants.success:
        return this.getAllJobs()
      case apiStatusConstants.failure:
        return this.getFailure()
      case apiStatusConstants.progress:
        return this.loadLoader()
      default:
        return null
    }
  }

  // search input element card
  searchInputElement = needToVisible => (
    <div className={`search-input-card ${needToVisible}`}>
      <input
        placeholder="Search"
        type="search"
        className="search-input"
        onChange={this.onChangeOfSearch}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="search-button"
        onClick={this.onSearchButton}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-body">
          {this.searchInputElement('mobile-search-input')}
          <div className="filter-container">
            <div className="profile-body">{this.callAuthorProfile()}</div>
            <FilterGroup
              employmentList={employmentTypesList}
              salaryList={salaryRangesList}
              onClickOfEmployment={this.onClickOfEmployment}
              onClickOfMinimumPackage={this.onClickOfMinimumPackage}
            />
          </div>
          <div className="all-job-body">
            {this.searchInputElement('large-view-search-input')}
            {this.getJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
