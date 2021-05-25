const jwt = require("jsonwebtoken");
const User = require("../../User/Models/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    console.log(decoded.id);
    User.find({ id: decoded.id })
      .exec()
      .then((user) => {
        if (user[0].role == "admin") {
          next();
        } else {
          return res.status(401).json({
            message:
              "Authentication failed. You do not have the rights to create a user.",
          });
        }
      });
  } catch (error) {
    return res.status(401).json({
      message:
        "Authentication failed. You do not have the rights to create a user.",
    });
  }
};
