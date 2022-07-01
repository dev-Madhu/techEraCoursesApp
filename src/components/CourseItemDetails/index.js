import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {blogData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const eachItem = await response.json()
      const updatedData = {
        id: eachItem.course_details.id,
        name: eachItem.course_details.name,
        imageUrl: eachItem.course_details.image_url,
        description: eachItem.course_details.description,
      }
      this.setState({
        blogData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {description, imageUrl, name} = blogData
    return (
      <div className="blog-info">
        <img src={imageUrl} className="course-img" alt={name} />
        <div className="course-details">
          <h1 className="course-title">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getBlogItemData()
  }

  renderCourseDetailsFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-note">
        We cannot seem to find the page you are looking for
      </p>

      <button className="failure-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderApiSuccess = () => (
    <div className="blog-container">{this.renderBlogItemDetails()}</div>
  )

  renderCourseItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderApiSuccess()
      case apiStatusConstants.failure:
        return this.renderCourseDetailsFailure()
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
        {this.renderCourseItemDetails()}
      </>
    )
  }
}

export default CourseItemDetails
