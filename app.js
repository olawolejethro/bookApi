const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const logger = require("./logger/logger");

const auth0Middleware = require("./auth/auth0");
const connectToDb = require("./database/mongoDB");
const config = require("./config/config");
const bookRoute = require("./route/books");
const authorRoute = require("./route/author");
const { requiresAuth } = require("express-openid-connect");

connectToDb();
// console.log(config.PORT);
const app = express();
const PORT = 4000;
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use(auth0Middleware);
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use("/api/v1/books", requiresAuth(), apiLimiter, bookRoute);
app.use("/api/v1/authors", requiresAuth(), apiLimiter, authorRoute);

app.get("/", (req, res) => {
  res.send("welcome to my app");
});
// Error handeler middleware

app.use((err, req, res, next) => {
  logger.error(err.message);
  const errorStatus = err.status || 500;
  res.status(errorStatus).send(err.message);
  next();
});

app.listen(PORT, () => {
  logger.info(`server is running on http://localhost:${PORT}`);
});
