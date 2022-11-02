// Write your code here
import './index.css'

import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isActive: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const titleInput = title
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onClickStarred = () => {
    const {isActive} = this.state

    this.setState({
      isActive: !isActive,
    })
  }

  onFilterAppointments = () => {
    const {appointmentsList, isActive} = this.state
    if (isActive) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {title, date, isActive} = this.state
    const starred = isActive ? 'starred' : 'not-starred'
    const filteredAppointmentsList = this.onFilterAppointments()

    return (
      <div className="container">
        <div className="card-container">
          <div className="upper-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <h1 className="add-appointment">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                className="title"
                id="title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <br />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                type="date"
                className="date"
                id="date"
                value={date}
                onChange={this.onChangeDate}
              />
              <br />
              <button type="submit" className="add">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr className="line" />
          <div className="header-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className={starred}
              onClick={this.onClickStarred}
              testid="star"
            >
              Starred
            </button>
          </div>
          <ul className="list">
            {filteredAppointmentsList.map(appointment => (
              <AppointmentItem
                key={appointment.id}
                appointmentDetails={appointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
