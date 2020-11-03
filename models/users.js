const { uuid } = require("uuidv4");

class User {
  constructor(name, email, password, image, book) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.image = image;
    this.book = book;
    this.id = uuid();
  }

  static from(json) {
    const user = new User();
    return Object.assign(user, json);
  }
}

module.exports = User;
