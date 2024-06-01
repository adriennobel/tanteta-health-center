import { Link } from "react-router-dom";
import Appointment from "../../models/Appointment";
import { DOCTOR_TITLE_MAP } from "../../constants/FixedContent";
import "./appointment-detail-comp.css";

function AppointmentDetail({ appointmentData, turnOn, closeModal, deleteEntry }) {

  // Create an instance of Appointment from the raw data
  const appointment = new Appointment(
    appointmentData._id,
    appointmentData.title,
    appointmentData.description,
    appointmentData.start,
    appointmentData.end,
    appointmentData.patientID,
    appointmentData.doctorID,
    appointmentData.doctorName,
    appointmentData.doctorSpecialty,
    appointmentData.doctorProfileImageUrl
  );

  const date = appointment.getFormattedDate();
  const times = appointment.getFormattedTimeRange();
  const description = appointment.getDescriptionParagraphs();

  let additionalCompClass = turnOn ? "" : " hide-view";

  return (
    <>
      <div className={"hidden-view" + additionalCompClass}>
        <div className="appt-detail-component-max-width-height">
          <div className="appt-detail-component">
            <div className="appt-detail-head">
              <h3 className="appt-detail-title">
                {appointment.title}
              </h3>
              <button
                onClick={closeModal}
                title="Close modal"
                aria-label="Close modal"
                className="appt-detail-component-close-btn"
              >
                X
              </button>
            </div>
            <div className="appt-detail-date-time-div">
              <p>{date}</p>
              <p>{times}</p>
            </div>
            <div className="appt-detail-provider-div">
              <div className="appt-detail-provider-image-div">
                <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=42" alt="" />
              </div>
              <div className="appt-detail-provider-name-title">
                <p>{appointment.doctorName}</p>
                <small>{DOCTOR_TITLE_MAP[appointment.doctorSpecialty] || "Physician"}</small>
              </div>
            </div>
            <div className="appt-detail-body">
              <p>
                {description.map((lineText, index) => (
                  <span key={index}>{lineText}<br /></span>
                ))}
              </p>
            </div>
            <div className="appt-detail-buttons">
              <Link to={"/edit-appointment/" + appointmentData._id} className="main-btn secondary">Edit</Link>
              <button onClick={() => deleteEntry(appointmentData._id)} className="main-btn fire">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppointmentDetail