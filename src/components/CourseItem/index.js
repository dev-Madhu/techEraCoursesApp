import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <li className="course-item">
      <Link to={`/courses/${id}`} className="course-link">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}
export default CourseItem
