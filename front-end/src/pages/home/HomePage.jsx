import { useEffect, useState } from "react";
import axios from "axios";
import CalendarComp from "../../components/calendar/CalendarComp";
import AppointmentComp from "../../components/appointment/AppointmentComp";
import AppointmentDetailComp from "../../components/appointment-detail/AppointmentDetailComp";
import { TODAY, TODAY_ISODATE } from "../../constants/DateConstants";
import "./home-page.css";

function HomePage() {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(<>No appointments found</>);
	const [selectedDate, setSelectedDate] = useState(TODAY_ISODATE);
	const [appointments, setAppointments] = useState([]);
	const [selectedAppointment, setSelectedAppointment] = useState({});
	const [showAppointmentDetail, setShowAppointmentDetail] = useState(false);

	async function viewDay(ISODATE) {
		setSelectedDate(ISODATE);
	}

	function viewAppointment(appointment) {
		setShowAppointmentDetail(true);
		setSelectedAppointment(appointment);
	}

	function closeAppointmentDetailComp() {
		setShowAppointmentDetail(false);
	}

	useEffect(() => {
		async function fetchAppointments() {
			const selectedDateString = new Date(selectedDate + "T00:00").toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
			
			setLoading(true);
			try {
				const response = await axios.get("/api/v1/appointments/fetch", {
					params: {
						date: selectedDate,
						interval: "DAY"
					}
				});
				if (Array.isArray(response.data) & response.data.length > 0) {
					setAppointments(response.data);
					setError(<></>);
				} else if (Array.isArray(response.data) & response.data.length == 0) {
					setError(<>No appointments found for <span>{selectedDateString}</span></>);
				} else {
					setError(<>Error fetching appointments</>);
				}
			} catch (error) {
				setError(<>Error fetching appointments</>);
			}
			setLoading(false);

			console.log("Fetching appointments for", selectedDate, "\nresult:", appointments, "\nerror state:", error);
		}
		fetchAppointments();
	}, [selectedDate])

	return (
		<>
			<div className="main-view">
				<section className="hp-section-1">
					<CalendarComp viewDay={viewDay} selectedDate={selectedDate} />
				</section>
				<section className="hp-section-2">
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
			/>
		</>
	)
}

export default HomePage