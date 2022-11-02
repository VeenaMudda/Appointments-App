// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-container">
      <div className="appointment-header">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickStar}
          testid="star"
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
