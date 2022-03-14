'use strict'
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { user } = require('../models/index');
const JWT = require('jsonwebtoken')
const SECRET = process.env.SECRET || "i hate testing";
const basicAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let basicHeeaderParts = req.headers.authorization.split(' ');
            let encoded = basicHeeaderParts.pop();
            let decoded = base64.decode(encoded);
            let [username, password] = decoded.split(':');

            const User = await user.findOne({ where: { username: username } });
            const PWD = await bcrypt.compare(password, User.password);
            console.log('password', password);
            console.log('22222222222222222222222222', PWD);
            if (PWD) {
                console.log('11111111111111111111');
                req.User = User 
                
                
                let newToken = JWT.sign({username:User.username},SECRET,{expiresIn : 500000});
                User.token = newToken;
                res.status(200).json(User);
            } else {
                res.status(403).send('invalid login Password');
            }
        }} catch(error) {
            res.status(403).send('invalid login Username');
        }

    }

module.exports = basicAuth;