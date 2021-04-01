const jwt = require('jsonwebtoken');
const sha256 = require('js-sha256');
const config = require('../../config/index');
const userModel = require('../models/userModel');
const loginService = {
    loginUser: async (req, res) => {
        try {
            const query = {
                email: req.body.email,
                password: sha256(req.body.password)
            };

            let data = await userModel.findOne(query).select('firstname email  username');
            if (data) {
                data = data.toObject();
                const token = await jwt.sign(
                    {
                        email: query.email,
                        username: data.username
                    },
                    config.jwtSecret,
                    {
                        expiresIn: config.jwtExpirationTime
                    }
                );
                data.token = token;
                
                const updateToken = await userModel.updateOne(
                    { _id: data._id }, { $set: { authtoken: token } }
                );
                if (updateToken) {
                    return res.status(config.success.code)
                        .json(data);
                }
                return res.status(config.internalServerError.code)
                    .json({message:'Failuere', data:'Internal Error'});
            }
            return res.status(config.success.code).json({message: 'Success', data:'You have Entered Invalid Email ID / Password . Please Try Again'});
        } catch (e) {
            return res.status(config.success.code).json({message:'Failuere', data:'Internal Error'});
        }
    },
    getUsersList: async (req, res) => {
        try {
        const query = {};
        let data = await userModel.find(query);
        if (data) {
            return res.status(config.success.code)
            .json(data);
        }
        return res.status(config.success.code).json({message: 'Success', data:'No Usesrs Found'});
        } catch (e) {
            return res.status(config.success.code).json({message:'Failuere', data:'Internal Error'});
        }
    },
    createUser: async (req,res) => {
        try {
            let query = {
                email: req.body.email,
                role: req.body.role
            };
            let data = await userModel.find(query);
            if (data.length > 0) {
                return res.status(config.success.code)
                .json({data:'Success',message:'User Already Exists'});
            } else { 
                query.password = sha256(req.body.password);
                query.firstname = req.body.firstname;
                query.lastname = req.body.lastname;


                const user = new userModel(query);
                const userdata = await user.save();
                return res.status(config.success.code).json({message: 'Success', data:'User Created Successfully logut and login'});
            }
        } catch (e) {
            return res.status(config.success.code).json({message:'Failuere', data:'Internal Error'});
        }
    }
    
};
module.exports = loginService;