const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
const app = express();

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./bcfAPI.json");

// BCF implementation

const routes = require("./api/routes");

const checkAuth = require("./api/bcf/Authentication/Middleware/check-auth");

// Database connection

/*mongoose.connect(process.env.MONGO_ATLAS_URL + process.env.MONGO_ATLAS_MAIN_SERVER + '?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology:true
  });
*/

mongoose.connect(
  process.env.MONGO_ATLAS_URL +
    process.env.MONGO_ATLAS_MAIN_SERVER +
    "?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//const init = require("./api/2.1/Authentication/Controller/auth");

//init.auth_init_signup();

// Settings

app.use(morgan("dev"));
//app.use("/uploads", express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/bcf/", routes);
// Routes which should handle requests

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error Handlers

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
