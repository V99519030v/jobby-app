import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobDetailsObject: {}}

  componentDidMount() {
    this.callJobDetailsApi()
  }

  updateJobItemDetails = jobData => {
    const updateJobDetails = {
      companyLogoUrl: jobData.job_details.company_logo_url,
      companyWebsiteUrl: jobData.job_details.company_website_url,
      employmentType: jobData.job_details.employment_type,
      id: jobData.job_details.id,
      jobDescription: jobData.job_details.job_description,
      location: jobData.job_details.location,
      packagePerAnnum: jobData.job_details.package_per_annum,
      rating: jobData.job_details.rating,
      title: jobData.job_details.title,
    }
    const skills = jobData.job_details.skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    }))
    const LifeAtCompany = {
      description: jobData.job_details.life_at_company.description,
      imageUrl: jobData.job_details.life_at_company.image_url,
    }
    const jobDetails = {...updateJobDetails, skills, LifeAtCompany}

    const similarJobs = jobData.similar_jobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    this.setState({
      apiStatus: apiStatusConstants.success,
      jobDetailsObject: {jobDetails, similarJobs},
    })
  }

  callJobDetailsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobItemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(jobItemUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      this.updateJobItemDetails(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onJobRetryButton = () => {
    this.callJobDetailsApi()
  }

  getJobItem = () => {
    const {jobDetailsObject} = this.state
    const {jobDetails, similarJobs} = jobDetailsObject
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      LifeAtCompany,
    } = jobDetails
    const {description, imageUrl} = LifeAtCompany

    return (
      <>
        <div className="job-card">
          <div className="specific-job-logo-rating-card">
            <img
              src={companyLogoUrl}
              className="specific-job-company-logo"
              alt="job details company logo"
            />
            <div className="specific-job-rating-card">
              <h1 className="specific-job-position-title">{title}</h1>
              <div className="specific-job-rating-icon-card">
                <AiFillStar className="specific-job-star-icon" />
                <p className="specific-job-rating-value">{rating}</p>
              </div>
            </div>
          </div>
          <div className="specific-job-location-package-employment-type-card">
            <div className="specific-job-location-employment-type-card">
              <div className="specific-job-location-card">
                <MdLocationOn className="specific-job-location-icon" />
                <p className="specific-job-location">{location}</p>
              </div>
              <div className="specific-job-employment-type-card">
                <BsFillBriefcaseFill className="specific-job-employment-icon" />
                <p className="specific-job-employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="specific-job-package">{packagePerAnnum}</p>
          </div>
          <div className="specific-job-description-link-card">
            <h1 className="specific-job-description-title">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="site-link"
              target="_blank"
              rel="noreferrer"
            >
              Visit <FiExternalLink className="external-link" />
              {/* <button className="site-link-button" type="submit">
                <FiExternalLink className="external-link" />
              </button> */}
            </a>
          </div>
          <p className="specific-job-description">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skill-card">
            {skills.map(eachSkill => (
              <SkillItem key={eachSkill.name} skillItem={eachSkill} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-card">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              className="life-at-company-image"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-job-card">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobItem
              key={eachSimilarJob.id}
              similarItem={eachSimilarJob}
            />
          ))}
        </ul>
      </>
    )
  }

  getFailureStatus = () => (
    <div className="job-failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="job-failure-image"
        alt="failure view"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure-msg">
        We cannot seem to find the page you are looking for
      </p>
      <div>
        <button
          className="job-retry-button"
          type="button"
          onClick={this.onJobRetryButton}
        >
          Retry
        </button>
      </div>
    </div>
  )

  loadLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getJobItem()
      case apiStatusConstants.failure:
        return this.getFailureStatus()
      case apiStatusConstants.progress:
        return this.loadLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-container">
        <Header />
        {this.getJobItemDetails()}
      </div>
    )
  }
}

export default JobItemDetails
