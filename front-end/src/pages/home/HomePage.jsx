import { useEffect, useState } from "react";
import axios from "axios";
import CalendarComp from "../../components/calendar/CalendarComp";
import DropdownComp from "../../components/drop-down/DropdownComp";
import AppointmentComp from "../../components/appointment/AppointmentComp";
import AppointmentDetailComp from "../../components/appointment-detail/AppointmentDetailComp";
import { TODAY_ISODATE } from "../../constants/DateConstants";
import { APPT_VIEW_INTERVALS } from "../../constants/FixedContent";
import "./home-page.css";

function HomePage() {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(<>No appointments found</>);
	const [selectedDate, setSelectedDate] = useState(TODAY_ISODATE);
	const [selectedInterval, setSelectedInterval] = useState(APPT_VIEW_INTERVALS[2]);
	const [appointments, setAppointments] = useState([]);
	const [selectedAppointment, setSelectedAppointment] = useState({});
	const [showAppointmentDetail, setShowAppointmentDetail] = useState(false);

	async function handleDateChange(newISODate) {
		setSelectedDate(newISODate);
	}

	function handleIntervalChange(newInterval) {
		setSelectedInterval(newInterval);
	}

	function viewAppointment(appointment) {
		setShowAppointmentDetail(true);
		setSelectedAppointment(appointment);
	}

	function closeAppointmentDetailComp() {
		setShowAppointmentDetail(false);
	}

	async function deleteAppointment(appointmentId) {
		const isConfirmed = window.confirm("Are you sure you want to delete this appointment?");
		if (!isConfirmed) {
			return; // Exit the function if the user cancels the confirmation
		}

		try {
			const response = await axios.delete(`/api/v1/appointments/delete/${appointmentId}`);
			if (response.status === 200) {
				alert("Appointment deleted successfully");
				window.location.reload();
			} else {
				alert("Failed to delete appointment.\nPlease try again later.");
			}
		} catch (err) {
			console.error("Error deleting appointment:", err);
			alert("Error deleting appointment");
		}
	}

	useEffect(() => {
		async function fetchAppointments() {
			const selectedDateString = new Date(selectedDate + "T00:00").toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

			setLoading(true);
			try {
				const response = await axios.get("/api/v1/appointments/fetch", {
					params: {
						date: selectedDate,
						interval: selectedInterval.value
					}
				});
				if (Array.isArray(response.data) & response.data.length > 0) {
					setAppointments(response.data);
					console.log(response.data);
					setError(<></>);
				} else if (Array.isArray(response.data) & response.data.length == 0) {
					setAppointments([]);
					setError(<>No appointments found for <span>{selectedDateString}</span></>);
				} else {
					setAppointments([]);
					setError(<>Error fetching appointments</>);
				}
			} catch (error) {
				setAppointments([]);
				setError(<>Error fetching appointments</>);
			}
			setLoading(false);
		}
		fetchAppointments();
	}, [selectedDate, selectedInterval])

	return (
		<>
			<div className="hp-main-view">
				<section className="hp-section-1">
					<CalendarComp selectedDate={selectedDate} setSelectedDate={handleDateChange} />
				</section>
				<section className="hp-section-2">
					<DropdownComp
						name="appt-view-interval"
						options={APPT_VIEW_INTERVALS}
						selectedOption={selectedInterval}
						setSelectedOption={handleIntervalChange}
					/>
					{loading ? <p className="hp-section-alert">Loading...</p> :
						(!error.props.children ? appointments.map((appointment, index) => (
							<AppointmentComp
								key={index}
								appointmentData={appointment}
								callBack={viewAppointment}
							/>
						)) : <p className="hp-section-alert">{error}</p>)
					}
				</section>
			</div>
			<AppointmentDetailComp
				appointmentData={selectedAppointment}
				turnOn={showAppointmentDetail}
				closeModal={closeAppointmentDetailComp}
				deleteEntry={deleteAppointment}
			/>
		</>
	)
}

export default HomePage