import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const AllJobs = props => {
  const {jobsObject} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsObject

  return (
    <Link to={`/jobs/${id}`} className="nav-card">
      <li className="job-item">
        <div className="company-logo-rating-card">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="rating-card">
            <h1 className="position-title">{title}</h1>
            <div className="rating-icon-card">
              <AiFillStar className="star-icon" />
              <p className="rating-value">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-employment-type-card">
          <div className="location-employment-type-card">
            <div className="location-card">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="employment-type-card-card">
              <BsFillBriefcaseFill className="employment-icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <h1 className="package">{packagePerAnnum}</h1>
        </div>
        <h1 className="description-title">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default AllJobs
