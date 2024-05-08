import { useEffect, useState } from "react";
import axios from "axios";
import CalendarComp from "../../components/calendar/CalendarComp";
import AppointmentComp from "../../components/appointment/AppointmentComp";
import AppointmentDetailComp from "../../components/appointment-detail/AppointmentDetailComp";
import "./home-page.css";

function HomePage() {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("No appointments found");
	const [appointments, setAppointments] = useState([]);
	const [selectedAppointment, setSelectedAppointment] = useState({});
	const [showAppointmentDetail, setShowAppointmentDetail] = useState(false);

	async function fetchAppointments(selectedDate) {
		setLoading(true);
		try {
			const response = await axios.get("/api/v1/appointments/fetch", {
				params: {
					date: selectedDate,
					interval: "DAY"
				}
			});
			if (response.data.lenght == 0) {
				setError('No appointments found'); // If the array is empty
			} else {
				setAppointments(response.data);
				setError("");
			}
			setLoading(false);
		} catch (error) {
			setError("Error fetching appointments");
			setLoading(false);
		}
		console.log("Fetching appointments for", selectedDate, "result:", appointments);
	}

	function viewAppointment(appointment) {
		setShowAppointmentDetail(true);
		setSelectedAppointment(appointment);
	}

	function closeAppointmentDetailComp() {
		setShowAppointmentDetail(false);
	}

	useEffect(() => {
		fetchAppointments(new Date().toISOString().split('T')[0]);
	}, [])

	return (
		<>
			<div className="main-view">
				<section className="hp-section-1">
					<CalendarComp callBack={fetchAppointments} />
				</section>
				<section className="hp-section-2">
					{loading ? <p className="hp-section-alert">Loading...</p> :
						(error == "" ? appointments.map((appointment, index) => (
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