import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useUser from "../../hooks/useUser";
import DropdownComp from "../../components/drop-down/DropdownComp";
import CalendarComp from "../../components/calendar/CalendarComp";
import { SPECIALTY_SERVICES_MAP } from "../../constants/FixedContent";
import { TODAY_ISODATE } from "../../constants/DateConstants";
import Doctor from "../../models/Doctor";
import "./schedule-a-visit-page.css";

const cache = {};

function ScheduleAVisitPage() {
  const { user, isLoading } = useUser();

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
    if (new Date(selectedDate + "T00:00") < new Date(TODAY_ISODATE + "T00:00")) {
      alert("Error creating appointment:\nYou can't book an appointment in the past.");
      return;
    }
    try {
      const appointment = {
        title: selectedVisitPurposeOption.text,
        description: descriptionRef.current.value,
        start: selectedTimeslotOption.value,
        end: "",
        patientID: user._id,
        doctorID: selectedDoctorOption.value,
        doctorName: selectedDoctorOption.text,
        doctorSpecialty: selectedVisitPurposeOption.value.split("-")[0],
        doctorProfileImageUrl: "/vite.svg"
      };
      const isConfirmed = window.confirm("Confirm details to create appointment!\n\n" +
        `Visit purpose: ${selectedVisitPurposeOption.text}\n` +
        `Provider: ${selectedDoctorOption.text}\n` +
        `Date: ${selectedDate}\n` +
        `Time: ${selectedTimeslotOption.text}\n` +
        `Notes: ${descriptionRef.current.value}`
      );
      if (!isConfirmed) {
        return; // Exit the function if the user cancels the confirmation
      }

      const response = await axios.post("/api/v1/appointments/create", { appointment });
      if (response.status === 200) {
        alert("Appointment created successfully");
        window.location.reload();
      } else {
        alert("Failed to create appointment:\nOur engineers are working to restore the connection. Please try again later.");
      }
    } catch (err) {
      alert("Error creating appointment:\nPlease make sure all selections are made.");
    }
  }

  useEffect(() => {
    async function fetchDoctors() {
      if (!selectedVisitPurposeOption) return;
      const specialty = selectedVisitPurposeOption?.value.split("-")[0];
      
      // Check if the data is already cached
      if (cache[specialty]) {
        setDoctorOptions(cache[specialty]);
        setSlectedDoctorOption();
        return;
      }

      try {
        const response = await axios.get(`/api/v1/doctors/fetch/${specialty}`);
        if (Array.isArray(response.data) & response.data.length > 0) {
          const doctorInstances = response.data.map(doctorData => {
            return new Doctor(
              doctorData._id,
              doctorData.uid,
              doctorData.email,
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
          cache[specialty] = newDoctorOptions;
        } else {
          setDoctorOptions([]);

          // Cache the data
          cache[specialty] = [];
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