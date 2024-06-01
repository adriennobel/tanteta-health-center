import { useState } from "react";
import { data } from "../../constants/Sample";
import Appointment from "../../models/Appointment";
import "./search-page.css";

function SearchPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="rp-main-view">
        <section className="rp-section-1">
          <input
            type="search"
            placeholder="Search visits"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </section>
        <section className="rp-section-2">
          <table>
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
              {data.filter((item) => search !== "" && (item.title.toLowerCase().includes(search) || item.doctorName.toLowerCase().includes(search))).map((item, index) => {
                const appt = new Appointment(item.id, item.title, item.description, item.start, item.end, item.patientID, item.doctorID, item.doctorName, item.doctorSpecialty, "");
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{appt.title}</td>
                    <td>{appt.getFormattedDate("M/D/YYYY")}</td>
                    <td>{appt.getFormattedTimeRange("start")}</td>
                    <td>{appt.doctorName}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}

export default SearchPage