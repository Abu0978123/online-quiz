const express = require('express')
const timeRoute = express.Router();
const Time = require('../model/Time')
const auth = require('./authToken')


timeRoute.get('/', auth,  async (req, res) => {


    try {
        const getTime = await Time.find();
        res.json(getTime)
    }
    catch (err) {
        res.send(err.message)
    }


})
timeRoute.post('/', async (req, res) => {
 try{
    const s = await Time.create({
       time:req.body.time
    })
    res.send(s)
 }
 catch(err){
     res.send(err)
 }
})


module.exports = timeRoute