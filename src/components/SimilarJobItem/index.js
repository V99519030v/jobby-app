import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarItem

  return (
    <li className="similar-job-item">
      <div className="similar-job-company-logo-rating-card">
        <img
          src={companyLogoUrl}
          className="similar-job-company-logo"
          alt="similar job company logo"
        />
        <div className="similar-job-rating-card">
          <h1 className="similar-job-position-title">{title}</h1>
          <div className="similar-job-rating-icon-card">
            <AiFillStar className="similar-job-star-icon" />
            <p className="similar-job-rating-value">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-title">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-location-employment-type-card">
        <div className="similar-job-location-card">
          <MdLocationOn className="similar-job-location-icon" />
          <p className="similar-job-location">{location}</p>
        </div>
        <div className="similar-job-employment-type-card">
          <BsFillBriefcaseFill className="similar-job-employment-icon" />
          <p className="similar-job-employment-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
