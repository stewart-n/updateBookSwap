class User {
  constructor(name, email, password, image, book) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.image = image;
    this.book = book;
  }

  static from(json) {
    const user = new User();
    return Object.assign(user, json);
  }
}

module.exports = User;
