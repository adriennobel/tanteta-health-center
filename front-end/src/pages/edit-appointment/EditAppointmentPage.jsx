import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DropdownComp from "../../components/drop-down/DropdownComp";
import CalendarComp from "../../components/calendar/CalendarComp";
import { SPECIALTY_SERVICES_MAP } from "../../constants/FixedContent";
import { TODAY_ISODATE } from "../../constants/DateConstants";
import Doctor from "../../models/Doctor";
import "./edit-appointment-page.css";

function EditAppointmentPage() {
  const cache = {};
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState();
  const [isDoctorLoaded, setIsDoctorLoaded] = useState(false);
  const [isTimeLoaded, setIsTimeLoaded] = useState(false);
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

  async function updateAppointment() {
    try {
      if (appointment.doctorSpecialty == selectedVisitPurposeOption.value &&
        appointment.description == descriptionRef.current.value &&
        appointment.start == selectedTimeslotOption.value &&
        appointment.doctorID == selectedDoctorOption.value
      ) {
        alert("No change detected!");
        return;
      }

      const updatedAppointment = {
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

      const response = await axios.put(`/api/v1/appointments/update/${appointmentId}`, {
        updatedAppointment
      });
      if (response.status === 200) {
        alert("Appointment updated successfully");
      } else {
        alert("Failed to update appointment:\nOur engineers are working to restore the connection. Please try again later.");
      }
      navigate('/');
    } catch (err) {
      alert("Error updating appointment:\nPlease make sure all selections are made.");
      console.error("Error updating appointment:", err);
    }
  }

  useEffect(() => {
    async function getAppointmentData() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/appointments/fetch/${appointmentId}`);
        
        // load form
        const resVisitPurpose = SPECIALTY_SERVICES_MAP.find(option => option.value == response.data.doctorSpecialty);
        setSelectedVisitPurposeOption(resVisitPurpose);

        const resDoctorOption = {
          value: response.data.doctorID,
          text: response.data.doctorName
        }
        setSlectedDoctorOption(resDoctorOption);

        const resISODate = response.data.start.split('T')[0];
        setSelectedDate(resISODate);

        const resTimeOption = {
          value: response.data.start,
          text: new Date(response.data.start).toLocaleTimeString(undefined, {
            hour: 'numeric', minute: 'numeric', timeZoneName: "short"
          })
        }
        setSelectedTimeslotOption(resTimeOption);

        descriptionRef.current.value = response.data.description;

        setAppointment(response.data);
        setIsDoctorLoaded(true);
        setIsTimeLoaded(true);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          alert("Appointment not found");
          navigate('/');
        } else {
          alert("Invalid URL");
          navigate('/');
        }
      }
      setLoading(false);
    }
    getAppointmentData();
  }, [])

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
          console.log(newDoctorOptions);
          // Cache the data
          cache[selectedVisitPurposeOption.value] = newDoctorOptions;
        } else {
          setDoctorOptions([]);  
          // Cache the data
          cache[selectedVisitPurposeOption?.value] = [];
        }
        !isDoctorLoaded && setSlectedDoctorOption();
        setIsDoctorLoaded(false);
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
        !isTimeLoaded && setSelectedTimeslotOption();
        setIsTimeLoaded(false)
      } catch (err) {
        console.error(err);
      }
    }
    fetchTimeslots();
  }, [selectedDate, selectedDoctorOption])

  return (
    <>
      <div className="eap-main-view">
        AppointmentId: {appointmentId}
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
        <button className="main-btn primary fixed-width" onClick={() => updateAppointment()}>Submit</button>
      </div>
    </>
  )
}

export default EditAppointmentPage