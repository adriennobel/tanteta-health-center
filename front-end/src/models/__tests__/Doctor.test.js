import { describe, expect, it } from "vitest";
import Doctor from "../Doctor";

describe('Doctor Class', () => {
  const doctorData = {
    id: 'doctor123',
    uid: 'uid123',
    email: 'doctor@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '123-456-7890',
    profileImageUrl: 'http://example.com/doctor.jpg',
    role: 'DOCTOR',
    specialty: 'Dentist'
  };

  it('should create a Doctor instance with correct properties', () => {
    const doctor = new Doctor(
      doctorData.id,
      doctorData.uid,
      doctorData.email,
      doctorData.firstName,
      doctorData.lastName,
      doctorData.phone,
      doctorData.profileImageUrl,
      doctorData.role,
      doctorData.specialty
    );

    expect(doctor.id).toBe(doctorData.id);
    expect(doctor.uid).toBe(doctorData.uid);
    expect(doctor.email).toBe(doctorData.email);
    expect(doctor.firstName).toBe(doctorData.firstName);
    expect(doctor.lastName).toBe(doctorData.lastName);
    expect(doctor.phone).toBe(doctorData.phone);
    expect(doctor.profileImageUrl).toBe(doctorData.profileImageUrl);
    expect(doctor.role).toBe(doctorData.role);
    expect(doctor.specialty).toBe(doctorData.specialty);
  });

  it('should return the correct full name with title', () => {
    const doctor = new Doctor(
      doctorData.id,
      doctorData.uid,
      doctorData.email,
      doctorData.firstName,
      doctorData.lastName,
      doctorData.phone,
      doctorData.profileImageUrl,
      doctorData.role,
      doctorData.specialty
    );

    expect(doctor.getFullNameWithTitle()).toBe('Dr. John Doe');
  });
});
