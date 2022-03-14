'use strict';

const express = require ('express');
const routers = express.Router();

const {user} = require('../models/index');
const bcrypt = require('bcrypt');

const basicAuth = require('../middleware/basicAuth');
const bearerAuth = require('../middleware/bearerAuth.js');




routers.post('/signin',basicAuth,()=>{

})

routers.get('/secretstuff',bearerAuth,(req,res)=>{
    res.status(200).json(req.User);
})

routers.post('/signup', async (req, res, next) => {
    let { username, password, role } = req.body;
    try {
        
        let hashedPassword = await bcrypt.hash(password,5)
        
    
        const newUser = await user.create({
            username: username,
            password: hashedPassword,
            role: role    });

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        next('invalid signUp');
    }
});

module.exports = routers;