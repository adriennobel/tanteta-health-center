import Appointment from "../../models/Appointment";
import "./appointment-comp.css";

function AppointmentComp({ appointmentData, callBack }) {

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

  const headlineText = appointment.getTitleWithDoctor();
  const date = appointment.getFormattedDate();
  const times = appointment.getFormattedTimeRange();
  const adaText = appointment.getADAText();

  return (
    <>
      <article onClick={() => callBack(appointmentData)} className="appointment-component">
        <div className="appt-item-head">
          <h3 className="appt-item-title">
            {headlineText}
          </h3>
        </div>
        <div className="appt-item-body">
          <div className="appt-item-date-time-div">
            <p>{date}</p>
            <p>{times}</p>
          </div>
          <button
            onClick={() => callBack(appointmentData)}
            aria-label={adaText}
            className="appt-item-button-ada-only">
            View details
          </button>
        </div>
      </article>
    </>
  )
}

export default AppointmentComp