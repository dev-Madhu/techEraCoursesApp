import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, coursesData: []}

  componentDidMount() {
    this.getAllCourses()
  }

  getAllCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(course => ({
        id: course.id,
        name: course.name,
        logoUrl: course.logo_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        coursesData: updatedData,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickRetryBtn = () => {
    this.getAllCourses()
  }

  renderCoursesFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-note">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-btn"
        type="button"
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {coursesData} = this.state
    return (
      <ul className="home-container">
        {coursesData.map(eachItem => (
          <CourseItem courseDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderCoursesFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <nav className="nav-bar">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </nav>
        <div className="main-container">
          <h1 className="course-head"> Courses</h1>
          {this.renderAllViews()}
        </div>
      </>
    )
  }
}

export default Home
