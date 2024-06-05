import { describe, expect, it } from "vitest";
import Appointment from "../Appointment";

describe('Appointment Class', () => {
  const appointmentData = {
    id: '1',
    title: 'Root Canal',
    description: 'Perform root canal procedure\nPrescribe medication',
    start: '2024-06-01T10:00:00Z',
    end: '2024-06-01T11:00:00Z',
    patientID: 'patient123',
    doctorID: 'doctor456',
    doctorName: 'Dr. Schwartzoski',
    doctorSpecialty: 'DENTISTRY',
    doctorProfileImageUrl: '',
  };

  it('should create an Appointment instance with correct properties', () => {
    const appointment = new Appointment(
      appointmentData.id,
      appointmentData.title,
      appointmentData.description,
      appointmentData.start,
      appointmentData.end,
      appointmentData.patientID,
      appointmentData.doctorID,
      appointmentData.doctorName,
      appointmentData.doctorSpecialty,
      appointmentData.doctorProfileImageUrl
    );

    expect(appointment.id).toBe(appointmentData.id);
    expect(appointment.title).toBe(appointmentData.title);
    expect(appointment.description).toBe(appointmentData.description);
    expect(appointment.start).toEqual(new Date(appointmentData.start));
    expect(appointment.end).toEqual(new Date(appointmentData.end));
    expect(appointment.patientID).toBe(appointmentData.patientID);
    expect(appointment.doctorID).toBe(appointmentData.doctorID);
    expect(appointment.doctorName).toBe(appointmentData.doctorName);
    expect(appointment.doctorSpecialty).toBe(appointmentData.doctorSpecialty);
    expect(appointment.doctorProfileImageUrl).toBe(appointmentData.doctorProfileImageUrl);
  });

  it('should return the correct title with doctor', () => {
    const appointment = new Appointment(
      appointmentData.id,
      appointmentData.title,
      appointmentData.description,
      appointmentData.start,
      appointmentData.end,
      appointmentData.patientID,
      appointmentData.doctorID,
      appointmentData.doctorName,
      appointmentData.doctorSpecialty,
      appointmentData.doctorProfileImageUrl
    );

    expect(appointment.getTitleWithDoctor()).toBe('Root Canal with Dr. Schwartzoski');
  });

  it('should return the formatted date', () => {
    const appointment = new Appointment(
      appointmentData.id,
      appointmentData.title,
      appointmentData.description,
      appointmentData.start,
      appointmentData.end,
      appointmentData.patientID,
      appointmentData.doctorID,
      appointmentData.doctorName,
      appointmentData.doctorSpecialty,
      appointmentData.doctorProfileImageUrl
    );

    const expectedFormattedDate = new Date(appointmentData.start).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    expect(appointment.getFormattedDate()).toBe(expectedFormattedDate);
    expect(appointment.getFormattedDate('M/D/YYYY')).toBe(new Date(appointmentData.start).toLocaleDateString());
  });

  it('should return the formatted time range', () => {
    const appointment = new Appointment(
      appointmentData.id,
      appointmentData.title,
      appointmentData.description,
      appointmentData.start,
      appointmentData.end,
      appointmentData.patientID,
      appointmentData.doctorID,
      appointmentData.doctorName,
      appointmentData.doctorSpecialty,
      appointmentData.doctorProfileImageUrl
    );

    const timeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const expectedTimeRange = `${timeFormatter.format(new Date(appointmentData.start))} - ${timeFormatter.format(new Date(appointmentData.end))}`;
    const expectedStartTime = timeFormatter.format(new Date(appointmentData.start));

    expect(appointment.getFormattedTimeRange()).toBe(expectedTimeRange);
    expect(appointment.getFormattedTimeRange('start')).toBe(expectedStartTime);
  });

  it('should return the correct ADA text', () => {
    const appointment = new Appointment(
      appointmentData.id,
      appointmentData.title,
      appointmentData.description,
      appointmentData.start,
      appointmentData.end,
      appointmentData.patientID,
      appointmentData.doctorID,
      appointmentData.doctorName,
      appointmentData.doctorSpecialty,
      appointmentData.doctorProfileImageUrl
    );

    const formattedDate = new Date(appointmentData.start).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const timeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const timeRange = `${timeFormatter.format(new Date(appointmentData.start))} - ${timeFormatter.format(new Date(appointmentData.end))}`;
    const expectedADAText = `View appointment with Dr. Schwartzoski on ${formattedDate} from ${timeRange}`;

    expect(appointment.getADAText()).toBe(expectedADAText);
  });

  it('should split the description into paragraphs', () => {
    const appointment = new Appointment(
      appointmentData.id,
      appointmentData.title,
      appointmentData.description,
      appointmentData.start,
      appointmentData.end,
      appointmentData.patientID,
      appointmentData.doctorID,
      appointmentData.doctorName,
      appointmentData.doctorSpecialty,
      appointmentData.doctorProfileImageUrl
    );

    const expectedParagraphs = [
      'Perform root canal procedure',
      'Prescribe medication'
    ];

    expect(appointment.getDescriptionParagraphs()).toEqual(expectedParagraphs);
  });
});
