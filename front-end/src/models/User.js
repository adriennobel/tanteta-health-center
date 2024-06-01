
class User {
  constructor(
    id,
    uid,
    email,
    firstName,
    lastName,
    phone,
    profileImageUrl,
    role
  ) {
    this.id = id;
    this.uid = uid,
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.profileImageUrl = profileImageUrl;
    this.role = role;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;
