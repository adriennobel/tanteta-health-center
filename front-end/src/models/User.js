
class User {
  constructor(
    id,
    email,
    password,
    firstName,
    lastName,
    phone,
    profileImageUrl,
    role
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
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
