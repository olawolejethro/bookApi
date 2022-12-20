const bookRouter = require("express").Router();
const controller = require("../controllers/bookController");
const {
  addbookValidation,
  updatebookValidation,
} = require("../validator/books.vaalidator");

bookRouter.post("/", addbookValidation, controller.postBook);

bookRouter.get("/", controller.getAllbooks);

bookRouter.get("/:Id", controller.getBookById);

bookRouter.patch("/:Id", updatebookValidation, controller.updateBook);

bookRouter.delete("/:Id", controller.deleteBook);

module.exports = bookRouter;
