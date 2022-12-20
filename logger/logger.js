const winston = require("winston");

const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5,
    colourize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colourize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.file),
  ],

  exitOnError: false,
});

module.exports = logger;
