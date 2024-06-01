
class Appointment {
  constructor(
    id = '',
    title = '',
    description = '',
    start = "",
    end = "",
    patientID = '',
    doctorID = '',
    doctorName = '',
    doctorSpecialty = '',
    doctorProfileImageUrl = ''
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.start = new Date(start);
    this.end = new Date(end);
    this.patientID = patientID;
    this.doctorID = doctorID;
    this.doctorName = doctorName;
    this.doctorSpecialty = doctorSpecialty;
    this.doctorProfileImageUrl = doctorProfileImageUrl;
  }

  getTitleWithDoctor() {
    return `${this.title} with ${this.doctorName}`;
    // e.g., "Root canal with Dr. Schwartzoski"
  }

  getFormattedDate() {
    try {
      if (arguments.length === 0) {
        return this.start.toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      } else {
        if (arguments[0] === "M/D/YYYY") return this.start.toLocaleDateString();
      }
    } catch (error) {
      return 'Error getting date';
    }
  }

  getFormattedTimeRange() {
    try {
      const timeFormatter = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      if (arguments.length === 0) {
        return `${timeFormatter.format(this.start)} - ${timeFormatter.format(this.end)}`;
      } else {
        if (arguments[0] === "start") return timeFormatter.format(this.start);
      }
    } catch (error) {
      return 'Error getting time';
    }
  }

  getADAText() {
    const formattedDate = this.getFormattedDate(); // Get the formatted date
    const timeRange = this.getFormattedTimeRange(); // Get the formatted time range

    return `View appointment with ${this.doctorName} on ${formattedDate} from ${timeRange}`;
  }

  getDescriptionParagraphs() {
    return this.description.split('\n');
  }
}

export default Appointment;
