const express = require('express');
const teacherRoute = express.Router();
const joi = require('joi');
const Teacher = require('../model/Teacher')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv/config')
 
const teacherShema = joi.object({
    name: joi.string().required().max(100).min(5),
    email: joi.string().required().email(),
    password: joi.string().required().max(400).min(5)
})



teacherRoute.post('/register', async (req, res) => {

    const message = await teacherShema.validate(req.body)
    if (message.error) {
        res.status(400).send(message.error.details[0].message)
    }
    else {
        const duplicate = await Teacher.findOne({ email: req.body.email })
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt)
        if (duplicate === null) {
            const registeredTeacher = Teacher.create({
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

teacherRoute.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const reg_teacher = await Teacher.findOne({ email: req.body.email })
    const varified = await bcrypt.compare(password, reg_teacher.password)
    if (varified) {

        const token = await jwt.sign({ _id: reg_teacher._id }, process.env.SECRET);
        res.send(token)

    }
    else {
        res.status(400).send('email or password is incorrect!')
    }

})

module.exports =teacherRoute;