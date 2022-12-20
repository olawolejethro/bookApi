const author = require("../models/books");

exports.postAuthor = async function (req, res) {
  try {
    const bookPosted = await author.create({ ...req.body });
    return res.status(201).json(bookPosted);
  } catch (error) {
    console.log(error);
    throw new Error("cannot post the author");
  }
};
exports.getAllAuthors = async function (req, res) {
  try {
    const books = await author.find(req.body);
    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    throw new Error("unable to get authors");
  }
};
exports.getAuthorById = async function (req, res) {
  try {
    const authorId = req.params.Id;
    const author = await author.findById(authorId);
    if (!author) {
      return res.json({ message: "author not found" });
    }
    return res.status(200).json(author);
  } catch (error) {
    console.log(error);
    throw new Error("unable to get this particular book");
  }
};
exports.updateAuthor = async function (req, res) {
  try {
    const authorId = req.params.bookId;
    const authorDetails = req.body;
    const detailsToBeUpdated = await author.findByIdAndUpdate(
      authorId,
      authorDetails,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!detailsToBeUpdated) {
      return res.json({ message: "details not found" });
    }
    return res.status(200).json(detailsToBeUpdated);
  } catch (error) {
    throw new Error("authors details update was unsuccesful");
  }
};

exports.deleteAuthor = async function (req, res) {
  try {
    const authorId = req.params.Id;
    const detailsToBeDeleted = await author.findByIdAndDelete(authorId);
    if (!detailsToBeDeleted) {
      return res.json({ message: "details not found" });
    }
    return res.status(204).json(detailsToBeDeleted);
  } catch (error) {
    throw new Error("authors update was unsuccesful");
  }
};
