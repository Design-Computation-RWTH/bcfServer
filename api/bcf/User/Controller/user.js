const mongoose = require("mongoose");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../Authentication/Middleware/check-auth");

//TODO: connect this with the token, so the server finds the right user id/ mail and searches the database for it

exports.current_user = (req, res, next) => {
  User.findOne({ id: jwt.decode(req.headers.authorization.split(" ")[1]).id })
    .select("name id")
    .exec()
    .then((doc) => {
      const response = {
        id: doc.id,
        name: doc.name,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
