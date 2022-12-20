const joi = require("joi");
const addauthorValidations = joi.object({
  firstname: joi.string().max(255).trim().required(),
  lastname: joi.string().max(500).required().trim(),
  DOB: joi.string().min(20).required(),
  books: joi.string().required().max(2022),
  country: joi.string().optional(),
});

const updateAuthorValidations = joi.object({
  firstname: joi.string().min(5).max(255).trim().optional(),
  lastname: joi.string().min(5).max(500).optional().trim(),
  DOB: joi.string().min(1990).max(2022).optional().trim(),
  books: joi.array().items(joi.string()).optional().max(2022),
  price: joi.number().optional(),
});

async function addauthorValidation(req, res, next) {
  const bookPayLoad = req.body;
  try {
    await addauthorValidations.validateAsync(bookPayLoad);
    next();
  } catch (error) {
    next(error.details[0].message);
  }
}
async function updateauthorValidation(req, res, next) {
  const bookPayLoad = req.body;
  try {
    await updateAuthorValidations.validateAsync(bookPayLoad);
    next();
  } catch (error) {
    next(error.details[0].message);
  }
}

module.exports = { addauthorValidation, updateauthorValidation };
