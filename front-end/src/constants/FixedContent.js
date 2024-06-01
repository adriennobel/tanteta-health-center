const APPT_VIEW_INTERVALS = [
  {
    value: "DAY",
    text: "Daily View",
  },
  {
    value: "WEEK",
    text: "Weekly View",
  },
  {
    value: "MONTH",
    text: "Monthly View",
  }
];

const SPECIALTY_SERVICES_MAP = [
  {
    value: "DENTISTRY-1",
    text: "Root canal"
  },
  {
    value: "DENTISTRY-2",
    text: "Dental cleanse"
  },
  {
    value: "DENTISTRY-3",
    text: "Orthodontics"
  },
  {
    value: "VISION-1",
    text: "Eye exam"
  },
  {
    value: "VISION-2",
    text: "Glaucoma evaluation"
  },
  {
    value: "FAMILY_MEDICINE-1",
    text: "Physical check-up"
  },
  {
    value: "FAMILY_MEDICINE-2",
    text: "Urgent care"
  }
];

const DOCTOR_TITLE_MAP = {
  DENTISTRY: "Dentist",
  VISION: "Ophthalmologist",
  FAMILY_MEDICINE: "Physician"
};

export { APPT_VIEW_INTERVALS, SPECIALTY_SERVICES_MAP, DOCTOR_TITLE_MAP }