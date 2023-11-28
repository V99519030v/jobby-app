import './index.css'

const SkillItem = props => {
  const {skillItem} = props
  const {imageUrl, name} = skillItem

  return (
    <li className="skill-item">
      <img src={imageUrl} className="skill-image" alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
