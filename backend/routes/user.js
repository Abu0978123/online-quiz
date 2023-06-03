const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const userRoute = express.Router();
const joi = require('joi');
const User = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv/config')

const userShema = joi.object({
    name: joi.string().required().max(100).min(5),
    email: joi.string().required().email(),
    password: joi.string().required().max(400).min(5)
})


userRoute.post('/register', async (req, res) => {

    const message = await userShema.validate(req.body)
    if (message.error) {
        res.status(400).send(message.error.details[0].message)
    }
    else {
        const duplicate = await User.findOne({ email: req.body.email })
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt)
        if (duplicate === null) {
            const registeredUser = User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            res.send(`${req.body.email} has been registered successfully.`)
        }
        else {
            res.send('email already registered.')
        }

    }
})

userRoute.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const reg_user = await User.findOne({ email: req.body.email })
    const varified = await bcrypt.compare(password, reg_user.password)
    if (varified) {

        const token = await jwt.sign({ _id: reg_user._id }, process.env.SECRET);
        res.send(token)

    }
    else {
        res.status(400).send('email or password is incorrect!')
        
    }

})

userRoute.get('/',async (req, res) => {
    
    try{  
        const getUser = await User.find();
        res.json(getUser)
    }
    catch(err){
        res.send(err.message)
    }
    

})







userRoute.patch('/', (req, res) => {
    res.send('update user')
})
userRoute.delete('/', (req, res) => {
    res.send('delete users')
})
module.exports = userRoute;