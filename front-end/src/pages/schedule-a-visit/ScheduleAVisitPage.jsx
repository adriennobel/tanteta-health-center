import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DropdownComp from "../../components/drop-down/DropdownComp";
import CalendarComp from "../../components/calendar/CalendarComp";
import { SPECIALTY_SERVICES_MAP } from "../../constants/FixedContent";
import { TODAY_ISODATE } from "../../constants/DateConstants";
import Doctor from "../../models/Doctor";
import "./schedule-a-visit-page.css";

const cache = {};

function ScheduleAVisitPage() {

  const [selectedVisitPurposeOption, setSelectedVisitPurposeOption] = useState();
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [selectedDoctorOption, setSlectedDoctorOption] = useState();
  const [selectedDate, setSelectedDate] = useState(TODAY_ISODATE);
  const [timeslotOptions, setTimeslotOptions] = useState([]);
  const [selectedTimeslotOption, setSelectedTimeslotOption] = useState();
  const descriptionRef = useRef(null);

  function handleVisitPurposeChange(selection) {
    setSelectedVisitPurposeOption(selection);
    setTimeslotOptions([]);
    setSelectedTimeslotOption();
  }

  function handleDoctorOptionChange(selection) {
    setSlectedDoctorOption(selection);
  }

  function handleDateChange(newISODate) {
    setSelectedDate(newISODate);
  }

  function handleTimeslotOptionChange(selection) {
    setSelectedTimeslotOption(selection);
  }

  async function createAppointment() {
    try {
      const appointment = {
        title: selectedVisitPurposeOption.text,
        description: descriptionRef.current.value,
        start: selectedTimeslotOption.value,
        end: "",
        patientID: "tbd",
        doctorID: selectedDoctorOption.value,
        doctorName: selectedDoctorOption.text,
        doctorSpecialty: selectedVisitPurposeOption.value,
        doctorProfileImageUrl: "/vite.svg"
      }
      const response = await axios.post("/api/v1/appointments/create", { appointment });
      if (response.status === 200) {
        alert("Appointment created successfully");
        window.location.reload();
      } else {
        alert("Failed to create appointment:\nOur engineers are working to restore the connection. Please try again later.");
        console.error("Failed to create appointment");
      }
    } catch (err) {
      alert("Error creating appointment:\nPlease make sure all selections are made.");
      console.error("Error creating appointment:", err);
    }
  }

  useEffect(() => {
    async function fetchDoctors() {
      // Check if the data is already cached
      if (cache[selectedVisitPurposeOption?.value]) {
        setDoctorOptions(cache[selectedVisitPurposeOption.value]);
        setSlectedDoctorOption();
        return;
      }

      if (!selectedVisitPurposeOption) return;
      try {
        const response = await axios.get(`/api/v1/doctors/fetch/${selectedVisitPurposeOption?.value}`);
        if (Array.isArray(response.data) & response.data.length > 0) {
          const doctorInstances = response.data.map(doctorData => {
            return new Doctor(
              doctorData._id,
              doctorData.email,
              doctorData.password,
              doctorData.firstName,
              doctorData.lastName,
              doctorData.phone,
              doctorData.profileImageUrl,
              doctorData.role,
              doctorData.specialty
            );
          });
          const newDoctorOptions = doctorInstances.map(doctor => ({
            value: doctor.id,
            text: doctor.getFullNameWithTitle()
          }));
          setDoctorOptions(newDoctorOptions);

          // Cache the data
          cache[selectedVisitPurposeOption.value] = newDoctorOptions;
        } else {
          setDoctorOptions([]);

          // Cache the data
          cache[selectedVisitPurposeOption?.value] = [];
        }
        setSlectedDoctorOption();
      } catch (err) {
        console.error(err);
      }
    }
    fetchDoctors();
  }, [selectedVisitPurposeOption])

  useEffect(() => {
    async function fetchTimeslots() {
      if (!selectedDoctorOption) return;
      try {
        const response = await axios.post("/api/v1/doctors/availability", {
          doctorId: selectedDoctorOption.value,
          date: selectedDate
        });
        if (Array.isArray(response.data) & response.data.length > 0) {
          const newTimeslotOptions = response.data.map(slot => ({
            value: slot,
            text: new Date(slot).toLocaleTimeString(undefined, {
              hour: 'numeric', minute: 'numeric', timeZoneName: "short"
            })
          }));
          setTimeslotOptions(newTimeslotOptions);
        } else {
          setTimeslotOptions([]);
        }
        setSelectedTimeslotOption();
      } catch (err) {
        console.error(err);
      }
    }
    fetchTimeslots();
  }, [selectedDate, selectedDoctorOption])

  return (
    <>
      <div className="savp-main-view">
        <div className="savp-question-div">
          <div className="savp-question-title">Purpose of visit</div>
          <DropdownComp
            name="visit-purpose"
            options={SPECIALTY_SERVICES_MAP}
            selectedOption={selectedVisitPurposeOption}
            setSelectedOption={handleVisitPurposeChange}
          />
        </div>
        <div className="savp-question-div">
          <div className="savp-question-title">Choose a provider</div>
          <DropdownComp
            name="visit-provider"
            options={doctorOptions}
            selectedOption={selectedDoctorOption}
            setSelectedOption={handleDoctorOptionChange}
          />
        </div>
        <div className="savp-question-div">
          <div className="savp-question-title">Pick a date</div>
          <CalendarComp
            selectedDate={selectedDate}
            setSelectedDate={handleDateChange}
          />
        </div>
        <div className="savp-question-div">
          <div className="savp-question-title">Pick a time</div>
          <DropdownComp
            name="visit-available-timeslots"
            options={timeslotOptions}
            selectedOption={selectedTimeslotOption}
            setSelectedOption={handleTimeslotOptionChange}
          />
        </div>
        <div className="savp-question-div">
          <div className="savp-question-title">Add more details to the reason of the visit</div>
          <textarea ref={descriptionRef} className="visit-description-textarea"></textarea>
        </div>
        <button className="main-btn primary fixed-width" onClick={() => createAppointment()}>Submit</button>
      </div>
    </>
  )
}

export default ScheduleAVisitPage