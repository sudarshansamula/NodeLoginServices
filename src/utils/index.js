
const util = require('util');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const userModel = require('../models/userModel');
const jwtAsync = util.promisify(jwt.verify);
const utilController = {
    tokenValidator: async (req, res, next) => {
        try {
            const jwtVerification = await jwtAsync(req.headers.token, config.jwtSecret);
            const query = {
                email: jwtVerification.email,
                authtoken: req.headers.token
            };
            const data = await userModel.findOne(query).select('_id');
            if (data) {
                next();
            } else {
                return res.status(config.success.code)
                    .json({message:'Failuere', data:'Access Denined'});
            }
        } catch (e) {
            if ((e.name === 'JsonWebTokenError') || (e.name === 'TokenExpiredError')) {
                return res.status(config.default.success.code).json({message:'Failuere', data:'Session Expired'});
            }
            console.log(e)
            return res.status(config.internalServerError.code)
                .json({message:'Failuere', data:'Internal Error'});
        }
    }
};
module.exports = utilController;