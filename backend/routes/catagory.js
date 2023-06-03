const express = require('express');
require('dotenv/config')

const catagoryRoute = express.Router();
const Catagory = require('../model/Catagory');



catagoryRoute.get('/', async (req, res) => {
    try {
        const getAllCat = await Catagory.find()
        res.send(getAllCat)
    }
    catch (err) {
        res.status(400).send(err)
    }

})
catagoryRoute.post('/', async (req, res) => {

    const catagory = req.body.catagory
    const duplicate = await Catagory.findOne({ catagory: req.body.catagory })

    if (duplicate === null) {
        try {
            const savRes = await Catagory.create({
                catagory: catagory,

            })
            res.send(savRes);
        }
        catch (err) {
            res.send(err)
        }
        res.send(`${req.body.catagory} has been submitted  successfully.`)

    }
    else {
        res.send(`${req.body.catagory} has already been submitted.`)
    }

})
module.exports = catagoryRoute