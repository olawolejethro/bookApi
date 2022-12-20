const joi = require("joi");
const addBookValidations = joi.object({
  title: joi.string().min(5).max(255).trim().required(),
  shortDescription: joi.string().min(5).max(500).optional().trim(),
  longDescription: joi.string().min(20).optional().trim(),
  year: joi.number().integer().required().max(2022),
  price: joi.number().required(),
  createdAt: joi.date().default(Date.now),
  lastUpdatedAt: joi.date().default(Date.now),
  isbn: joi.number().min(9).max(14).optional(),
});

const updateBookValidations = joi.object({
  title: joi.string().min(5).max(255).trim().optional(),
  shortDescription: joi.string().min(5).max(500).optional().trim(),
  longDescription: joi.string().min(20).optional().trim(),
  year: joi.number().integer().optional().max(2022),
  price: joi.number().optional(),
  isbn: joi.number().min(9).max(13).optional(),
});

async function addbookValidation(req, res, next) {
  const bookPayLoad = req.body;
  try {
    await addBookValidations.validateAsync(bookPayLoad);
    next();
  } catch (error) {
    next(error.details[0].message);
  }
}
async function updatebookValidation(req, res, next) {
  const bookPayLoad = req.body;
  try {
    await updateBookValidations.validateAsync(bookPayLoad);
    next();
  } catch (error) {
    next(error.details[0].message);
  }
}

module.exports = { addbookValidation, updatebookValidation };
