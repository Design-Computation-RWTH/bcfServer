const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const decoded = jwt.decode(token);
        console.log(token)
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}