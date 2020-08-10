const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../User/Models/user");
const { hash } = require('bcrypt');

//TODO: implement authorization grant and remove client grant

exports.auth_get =  (req, res, next) => {
    const response = {
        "oauth2_auth_url" : process.env.SERVER_URL + "/bcf/oauth2/auth",
        "oauth2_token_url" : process.env.SERVER_URL + "/bcf/oauth2/token",
        "oauth2_dynamic_client_reg_url" : process.env.SERVER_URL + "/bcf/oauth2/reg",
        "http_basic_support": true,
        "supported_oauth2_flows" : [
            "client_credentials_grant"
        ]
    }
    res.status(200).json(response)
};


exports.auth_signup = (req, res, next) => {
    User.find({id: req.body.id})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Mail already registered"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else { 
                    const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    id: req.body.id ,
                    name: req.body.name,
                    password: hash,
                    role: req.body.role
                });  
                user
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        id: req.body.id ,
                        name: req.body.name,
                        role: req.body.role
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                    });         
                }
            });             
        }
    })
    .catch()    
};

exports.auth_login = (req, res, next) => {
    User.find({ id: req.body.id})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            } if (result) {
                const token = jwt.sign({
                        id: user[0].id,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "Authentication successful",
                    token: token
                });
            }
            return res.status(401).json({
                message: "Authentication failed"
            });
        })

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });    
};