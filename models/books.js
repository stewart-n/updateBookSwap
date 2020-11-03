class Book {
  constructor(title, author, description) {
    this.title = title;
    this.author = author;
    this.description = description;
  }

  static from(json) {
    const book = new Book();
    return Object.assign(book, json);
  }
}

module.exports = Book;
