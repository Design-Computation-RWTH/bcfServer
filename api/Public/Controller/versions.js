const mongoose = require("mongoose");

//TODO: Get Versions dynamically

exports.get_versions = (req, res, next) => {
        const response = {
            "versions": [{
                "version_id": "2.1",
                "detailed_version": "https://github.com/BuildingSMART/BCF-API"
            }]         
        };
        res.status(200).json(response);
      };