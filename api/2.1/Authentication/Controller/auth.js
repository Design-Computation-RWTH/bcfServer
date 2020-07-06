const mongoose = require('mongoose');

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
    }