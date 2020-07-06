const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
mongoose.set("useFindAndModify", false)
const app = express();

// TODO: Implement a server address in the nodemon.json.... so you just have to change the server address one time

// Old examples

const productRoutes = require("./api/2.1/Examples/routes/products");
const orderRoutes = require("./api/2.1/Examples/routes/orders");
//const userRoutes = require("./api/2.1/Examples/routes/user");


// BCF implementation

const versionsRoutes = require("./api/Public/routes/versions");
const authRoutes = require("./api/2.1/Authentication/Routes/auth");
const userRoutes = require("./api/2.1/User/routes/user");
const projectsRoutes = require("./api/2.1/Projects/routes/projects");


// Database connection


mongoose.connect('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/bcfServer?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology:true
  });


// Binary upload?

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: false }));
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

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
// app.use("/user", userRoutes);
app.use("/bcf/versions", versionsRoutes);
app.use("/bcf/2.1/auth", authRoutes);
app.use("/bcf/2.1/current-user/", userRoutes);
app.use("/bcf/2.1/projects/", projectsRoutes);



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;