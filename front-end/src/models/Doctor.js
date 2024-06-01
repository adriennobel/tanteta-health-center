import User from "./User";

class Doctor extends User {
  constructor(
    id = '',
    uid = '',
    email = '',
    firstName = '',
    lastName = '',
    phone = '',
    profileImageUrl = '',
    role = 'DOCTOR',
    specialty = ''
  ) {
    super(id, uid, email, firstName, lastName, phone, profileImageUrl, role);
    this.specialty = specialty;
  }

  getFullNameWithTitle() {
    return `Dr. ${this.firstName} ${this.lastName}`;
  }
}

export default Doctor;
