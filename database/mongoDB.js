const mongoose = require("mongoose");
const config = require("../config/config");
const logger = require("../logger/logger");

function connectToDb() {
  mongoose.set("strictQuery", true);
  mongoose.connect("mongodb://localhost:27017");
  //  mongoose.connect(
  //   "mongodb+srv://olawole111:olawole111@cluster0.12uudju.mongodb.net/FirstDatabase?retryWrites=true&w=majority"
  // );

  mongoose.connection.on("connected", () => {
    logger.info("mongodb connected successfully");
  });

  mongoose.connection.on("error", () => {
    logger.info("an error occured");
  });
}

module.exports = connectToDb;
