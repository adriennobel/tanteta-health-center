import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../../hooks/useUser";
import Appointment from "../../models/Appointment";
import "./reports-page.css";

function ReportsPage() {
	const { user, isLoading } = useUser();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(<>No appointments found</>);
  const [appointments, setAppointments] = useState([]);

  const dentistryCount = appointments.filter(item => item.doctorSpecialty === "DENTISTRY").length;
  const visionCount = appointments.filter(item => item.doctorSpecialty === "VISION").length;
  const familyCount = appointments.filter(item => item.doctorSpecialty === "FAMILY_MEDICINE").length;

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/appointments/fetchall", {
          params: {
            _id: user._id
          }
        });
        if (Array.isArray(response.data) & response.data.length > 0) {
          setAppointments(response.data);
          setError(<></>);
        } else if (Array.isArray(response.data) & response.data.length == 0) {
          setAppointments([]);
          setError(<>No appointments found.</>);
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
  }, [isLoading])

  return (
    <>
      <div className="rp-main-view">
        <section className="rp-search-section">
          <div className="search-bar-div">
            <h2>Search all visits</h2>
            <input
              type="search"
              placeholder="Type something"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              className="rp-search-input"
            />
          </div>
          {loading ? <p className="hp-section-alert">Loading...</p> :
						(error.props.children && <p className="hp-section-alert">{error}</p>)
					}
          {search !== "" && ((appointments.filter((item) => search !== "" && (item.title.toLowerCase().includes(search) || item.doctorName.toLowerCase().includes(search))).length === 0) ?
            <p colSpan="5">No appointments found matching your search criteria: <strong>"{search}"</strong></p>
            :
            <div className="search-results-table">
              <table className="default-table scroll-in-parent">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.filter((item) => search !== "" && (item.title.toLowerCase().includes(search) || item.doctorName.toLowerCase().includes(search))).map((item, index) => {
                    const appt = new Appointment(item.id, item.title, item.description, item.start, item.end, item.patientID, item.doctorID, item.doctorName, item.doctorSpecialty, "");
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{appt.title}</td>
                        <td>{appt.getFormattedDate("M/D/YYYY")}</td>
                        <td>{appt.getFormattedTimeRange("start")}</td>
                        <td>{appt.doctorName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>)}
        </section>
        <section className="rp-summary-section">
          <h2>Visit summary</h2>
          <table className="default-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dentistry</td>
                <td>{dentistryCount}</td>
              </tr>
              <tr>
                <td>Vision</td>
                <td>{visionCount}</td>
              </tr>
              <tr>
                <td>Family Medicine</td>
                <td>{familyCount}</td>
              </tr>
              <tr>
                <td>Total visits</td>
                <td>{appointments.length}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}

export default ReportsPage