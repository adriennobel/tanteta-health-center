import Appointment from "../../models/Appointment";
import "./appointment-detail-comp.css";

function AppointmentDetail({ appointmentData, turnOn, closeModal }) {

  // Create an instance of Appointment from the raw data
  const appointment = new Appointment(
    appointmentData.id,
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
                <small>{appointment.doctorSpecialty}</small>
              </div>
            </div>
            <div className="appt-detail-body">
              {description.map((lineText, index) => (
                <p key={index}>{lineText}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppointmentDetail