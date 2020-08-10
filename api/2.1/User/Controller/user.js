const mongoose = require('mongoose');
const User = require("../Models/user");
const jwt = require("jsonwebtoken")
const checkAuth = require("../../Authentication/Middleware/check-auth");

//TODO: connect this with the token, so the server finds the right user id/ mail and searches the database for it

/* TESTOKEN
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNjaHVsekBkYy5yd3RoLWFhY2hlbi5kZSIsIm5hbWUiOiJPbGl2ZXIgU2NodWx6IiwiaWF0IjoxNTkyNjY1MTI0LCJleHAiOjE1OTI2Njg3MjR9.2mVBTzYUn26hDBab2DWGLwbuV7HkmOeYLysRpMV-azY
*/

exports.current_user = (req, res, next) => {
    User.findOne({id: jwt.decode(req.headers.authorization.split(" ")[1]).id})
    .select("name id")
    .exec()
    .then(doc => {
        const response = {
            id: doc.id,
            name: doc.name
        }
    res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
