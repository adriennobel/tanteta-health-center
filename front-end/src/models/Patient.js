import User from "./User";

class Patient extends User {
  constructor(
    id = '',
    uid = '',
    email = '',
    firstName = '',
    lastName = '',
    phone = '',
    profileImageUrl = '',
    role = 'PATIENT',
    enrolmentDate = new Date(),
    notes = []
  ) {
    super(id, uid, email, firstName, lastName, phone, profileImageUrl, role);
    this.enrolmentDate = enrolmentDate;
    this.notes = notes;
  }

  addNote(note) {
    this.notes.push(note);
  }

  deleteNote(index) {
    this.notes.splice(index, 1);
  }
}

export default Patient;
