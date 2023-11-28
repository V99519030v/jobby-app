import './index.css'

const FilterGroup = props => {
  const {
    employmentList,
    salaryList,
    onClickOfEmployment,
    onClickOfMinimumPackage,
  } = props

  const callEachEmploy = eachEmploy => {
    const {label, employmentTypeId} = eachEmploy
    const onCheckbox = event => {
      onClickOfEmployment(employmentTypeId, event)
    }

    return (
      <li key={employmentTypeId} className="employ-item">
        <input
          type="checkbox"
          id={employmentTypeId}
          className="checkbox-input"
          onClick={onCheckbox}
          value={employmentTypeId}
        />
        <label htmlFor={employmentTypeId} className="employ-label">
          {label}
        </label>
      </li>
    )
  }

  const callEahSalary = eachSalary => {
    const {salaryRangeId, label} = eachSalary
    const onRadio = () => {
      onClickOfMinimumPackage(salaryRangeId)
    }

    return (
      <li key={salaryRangeId} className="salary-item">
        <input
          type="radio"
          id={salaryRangeId}
          name="salary"
          className="salary-input"
          onClick={onRadio}
          value={salaryRangeId}
        />
        <label htmlFor={salaryRangeId} className="salary-label">
          {label}
        </label>
      </li>
    )
  }

  return (
    <>
      <h1 className="employ-type-group">Type of Employment</h1>
      <ul className="employ-type-card">
        {employmentList.map(eachEmploy => callEachEmploy(eachEmploy))}
      </ul>
      <h1 className="salary-range-group">Salary Range</h1>
      <ul className="salary-type-card">
        {salaryList.map(eachSalary => callEahSalary(eachSalary))}
      </ul>
    </>
  )
}

export default FilterGroup
