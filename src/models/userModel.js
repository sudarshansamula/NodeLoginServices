const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: String,
        password: String,
        firstname:{
            type: String,
            default: null
        },
        lastname: {
            type: String,
            default: null
        },
        authtoken: {
            type: String,
            default: null
        },
        role: {
            type: String,
            default: null
        }
    },
    { collection: 'userInfo' }
);
const userModel = mongoose.model('userInfo', userSchema);

module.exports =  userModel;
