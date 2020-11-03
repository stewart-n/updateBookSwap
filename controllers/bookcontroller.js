const { validationResult } = require("express-validator");
const mongoClient = require("../db/myMongoDB");
const HttpError = require("../models/http-error");
const Book = require("../models/books");

const getBookID = async (req, res, next) => {
  const bookID = req.params.pid;

  let book;
  try {
    book = await mongoClient
      .getDb()
      .collection("books")
      .find({ _id: bookID })
      .toArray();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find book",
      505
    );
    return next(error);
  }

  if (!book) {
    const error = new HttpError("Could not find book with provided id.", 404);
    return next(error);
  }

  res.json({ book: book.toObject({ getters: true }) });
};

const getBookByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithBook;
  try {
    userWithBook = await mongoClient
      .getDb()
      .collection("user")
      .find({ _id: userId })
      .toArray();
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (!userWithBook || userWithBook.books.length === 0) {
    return next(new HttpError("Could not find book with provided id.", 404));
  }

  res.json({
    book: userWithBook.books.map((book) => book.toObject({ getters: true })),
  });
};

const createBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Please try again", 422));
  }

  const { title, description, author } = req.body;

  const createdBook = new Book({
    title,
    description,
    author,
  });

  const book = await mongoClient
    .getDb()
    .collection("books")
    .insertOne(createdBook);

  if (!book) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  console.log(book);

  res.status(201).json({ book: createBook });
};

const updateBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description } = req.body;
  const bookId = req.params.bid;

  let book;
  try {
    book = await mongoClient
      .getDb()
      .collection("books")
      .updateOne({ _id: bookId }, { title, description });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update book.",
      500
    );
    return next(error);
  }

  book.title = title;
  book.description = description;

  try {
    await book.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update book.",
      500
    );
    return next(error);
  }

  res.status(200).json({ book: book.toObject({ getters: true }) });
};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.bid;

  let book;
  try {
    book = await mongoClient
      .getDb()
      .collection("books")
      .deleteOne({ _id: bookId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete book.",
      500
    );
    return next(error);
  }

  if (!book) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  res.status(200).json({ message: "Deleted book." });
};

exports.getBookID = getBookID;
exports.getBookByUserId = getBookByUserId;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
