const { date } = require("joi");
const moogoose = require("mongoose");

//Define a schema
const Schema = moogoose.Schema;

//Define book schema
const authorSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  DOB: {
    type: String,
    required: false,
  },
  country: { type: String, required: false },
  books: {
    type: Array,
    default: [],
  },

  createdAT: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = moogoose.model("authors", authorSchema); //collection name is Books. This is the name of the collection in the database
