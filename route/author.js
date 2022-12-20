const authorRouter = require("express").Router();
const controller = require("../controllers/authorController");
const {
  addauthorValidation,
  updateauthorValidation,
} = require("../validator/author.validator");

authorRouter.post("/", addauthorValidation, controller.postAuthor);

authorRouter.get("/", controller.getAllAuthors);

authorRouter.get("/:Id", controller.getAuthorById);
authorRouter.patch("/:id", updateauthorValidation, controller.updateAuthor);

authorRouter.delete("/:Id", controller.deleteAuthor);

module.exports = authorRouter;
