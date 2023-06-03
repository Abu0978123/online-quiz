const express = require('express');
const jwt = require('jsonwebtoken')
require('dotenv/config')
const auth = require('./authToken')
const questionRoute = express.Router();
const Question = require('../model/Question');


questionRoute.get('/', async (req, res) => {


    try {
        const getQuestion = await Question.find();
        res.json(getQuestion)
    }
    catch (err) {
        res.send(err.message)
    }


})
questionRoute.get('/:catagory', async (req, res) => {


    try {

        
        const getQuestion = await Question.find({catagory:req.params.catagory});
        res.json(getQuestion)
    }
    catch (err) {
        res.send(err.message)

    }


})
questionRoute.post('/', async (req, res) => {

    const catagory = req.body.catagory
    const topic = req.body.topic
    const question = req.body.question
    const correct_option = req.body.correct_option
    const incorrect_options = req.body.incorrect_options

    try {

        const savRes = await Question.create({
            catagory:catagory,
            topic:topic,
            question: question,
            correct_option: correct_option,
            incorrect_options: incorrect_options
        })
        res.send(savRes);
    }
    catch (err) {
        res.send(err.message)
    }
})
questionRoute.patch('/:id', async (req, res) => {
    try {
        const updatedQuestion = await Question.updateOne( { _id: req.params.id },
            {
                $set: { question: req.body.question,
                        correct_option: req.body.correct_option,
                        incorrect_options: req.body.incorrect_options
                }

            },
         console.log(req.body.incorrect_options)
        )
        res.send(updatedQuestion)
    }
    catch (err) {
        res.send(err.message)
    }

})
questionRoute.delete('/:id', async (req, res) => {

    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id)
        res.send(deletedQuestion)
    }
    catch (err) {
        console.log(err)
    }


})
module.exports = questionRoute;