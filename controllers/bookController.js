const book = require("../models/books");

exports.postBook = async function (req, res) {
  try {
    const bookPosted = await book.create({ ...req.body });
    return res.status(201).json(bookPosted);
  } catch (error) {
    console.log(error);
    throw new Error("cannot post the book");
  }
};
exports.getAllbooks = async function (req, res) {
  try {
    const books = await book.find();
    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    throw new Error("unable to get books");
  }
};

exports.getBookById = async function (req, res) {
  try {
    const bookId = req.params.Id;
    console.log(bookId);
    const boook = await book.findById(bookId);
    if (!boook) {
      return res.json({ message: "book not found" });
    }
    return res.status(200).json(boook);
  } catch (error) {
    console.log(error);
    throw new Error("unable to get book");
  }
};
exports.updateBook = async function (req, res) {
  try {
    const bookId = req.params.Id;
    // console.log(Id);
    const booksParsed = req.body;
    const booksToBeUpDated = await book.findByIdAndUpdate(bookId, booksParsed, {
      new: true,
      runValidators: true,
    });
    if (!booksToBeUpDated) {
      return res.json({ message: "book not found" });
    }
    return res.status(200).json(booksToBeUpDated);
  } catch (error) {
    console.log(error);
    throw new Error("book update was unsuccesful");
  }
};
exports.deleteBook = async function (req, res) {
  try {
    const _Id = req.params.Id;
    console.log(_Id);
    const booksToBeDeleted = await book.findByIdAndDelete(_Id);
    if (!booksToBeDeleted) {
      return res.json({ message: "book not found" });
    }
    return res.status(204).json(booksToBeDeleted);
  } catch (error) {
    console.log(error);
    throw new Error("book update was unsuccesful");
  }
};
