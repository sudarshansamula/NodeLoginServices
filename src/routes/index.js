/* eslint-disable no-restricted-syntax */

const express = require('express');
const jsondata = require('./sampledata.json');
const verifyToken = require('../utils/index');
const userService = require('../service/loginService');


const router = new express.Router();



router.get('/', (req, res) => {
    res.status(200).send('success');
});

router.post('/login',(req,res) => {
    userService.loginUser(req,res);
});

router.get('/getAllUsers',verifyToken.tokenValidator,(req,res) => {
    userService.getUsersList(req,res);
});

router.post('/createUser',verifyToken.tokenValidator,(req,res) => {
    userService.createUser(req,res);
});












router.post('/getMatchedData', async (req, res) => {
    const query = {};
    const matchedSet = [];
    const emplydata = await employeModel.find(query, { _id: 0 }).select('employId Name');
    if (emplydata.length > 0) {
        // eslint-disable-next-line guard-for-in
        for (const d in emplydata) {
            const eachObj = emplydata[d];
            const filedata = jsondata[d];
            if (JSON.stringify(eachObj) === JSON.stringify(filedata)) {
                matchedSet.push(eachObj);
            }
        }
    }
    return res.status(200)
        .json({ success:true, data: matchedSet});
});
module.exports = router;
