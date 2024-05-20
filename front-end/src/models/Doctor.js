import User from "./User";

class Doctor extends User {
  constructor(
    id = '',
    email = '',
    password = '',
    firstName = '',
    lastName = '',
    phone = '',
    profileImageUrl = '',
    role = 'DOCTOR',
    specialty = ''
  ) {
    super(id, email, password, firstName, lastName, phone, profileImageUrl, role);
    this.specialty = specialty;
  }

  getFullNameWithTitle() {
    return `Dr. ${this.firstName} ${this.lastName}`;
  }
}

export default Doctor;
