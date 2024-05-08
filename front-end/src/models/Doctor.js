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
}

export default Doctor;
